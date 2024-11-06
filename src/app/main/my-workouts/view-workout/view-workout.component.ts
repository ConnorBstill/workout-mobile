import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Observable, Subject, Subscription, timer } from 'rxjs';

import { RestService } from 'src/app/services/rest.service';

import { environment } from '../../../../environments/environment';
import { Workout, Exercise } from 'src/app/common/types/workouts';
@Component({
  selector: 'app-view-workout',
  templateUrl: './view-workout.component.html',
  styleUrls: ['./view-workout.component.scss'],
})
export class ViewWorkoutComponent {
  // State for the workout itself
  public workout: Workout = {
    id: null,
    name: '',
    scheduledDate: '',
  };
  public workoutInProgress: boolean = false;
  public workoutTimerSeconds: number = 0;
  public workoutTimer: Subscription = null;

  // State for the exercises in the workout
  public exercises: Exercise[] = [];
  public currentExerciseIndex: number = null;
  public currentExerciseSets: {
    setActive: boolean;
    restActive: boolean;
  }[] = [];

  // State for the sets in the exercises
  public currentSetIndex: number = null;
  public currentSetTimerSeconds: number = 0;
  public currentSetTimer: Subscription = null;

  constructor(private readonly route: ActivatedRoute, private readonly rest: RestService, private datePipe: DatePipe) {}

  ionViewWillEnter() {
    this.workout = <Workout>this.route.snapshot.queryParams;
    this.rest.get(`${environment.apiUrl}/api/workout/${this.workout.id}/exercise`).then((res) => {
      this.exercises = res.data;

      if (this.workout.startWorkout && this.exercises.length) {
        this.startWorkout();
      }
    });
  }

  currentSetTimerText(): string {
    if (this.currentSetTimerSeconds >= 0) {
      return ` - ${this.datePipe.transform(this.currentSetTimerSeconds * 1000, 'mm:ss')}`;
    }
  }

  startWorkout() {
    this.workoutInProgress = true;
    this.currentExerciseIndex = 0;
    this.currentSetIndex = 0;

    this.startNewExercise();

    this.currentSetTimer = timer(0, 1000).subscribe((val) => {
      if (this.currentExerciseSets[this.currentSetIndex].restActive) {
        this.currentSetTimerSeconds--;
      } else if (this.currentExerciseSets[this.currentSetIndex].setActive) {
        this.currentSetTimerSeconds++;
      }

      // When the rest time is over, automatically move onto the next set
      if (this.currentSetTimerSeconds === 0 && this.currentExerciseSets[this.currentSetIndex].restActive) {
        this.goToNextSet();
      }
    });

    this.workoutTimer = timer(0, 1000).subscribe((val) => {
      this.workoutTimerSeconds++;
    });
  }

  goToNextSet(): void {
    this.currentSetTimerSeconds = 0;

    // Runs if you're going from set to rest
    if (this.currentExerciseSets[this.currentSetIndex].setActive) {
      const restTime = this.exercises[this.currentExerciseIndex].restTime;

      this.currentExerciseSets[this.currentSetIndex].setActive = false;
      this.currentExerciseSets[this.currentSetIndex].restActive = true;
      this.currentSetTimerSeconds = restTime;

      // Runs if you're going from rest to set
    } else if (
      this.currentExerciseSets[this.currentSetIndex].restActive &&
      this.currentSetIndex !== this.currentExerciseSets.length - 1
    ) {
      this.currentExerciseSets[this.currentSetIndex].restActive = false;
      this.currentSetIndex++;
      this.currentExerciseSets[this.currentSetIndex].setActive = true;

      // Runs if you're finishing the last set/rest in the exercise
    } else if (
      this.currentSetIndex === this.currentExerciseSets.length - 1 &&
      this.currentExerciseSets[this.currentSetIndex].restActive
    ) {
      // Runs if you're finishing the last set/rest in the last exercise
      if (this.currentExerciseIndex === this.exercises.length - 1) {
        this.finishWorkout();
        return;
      }

      this.currentExerciseIndex++;
      this.currentSetIndex = 0;

      this.startNewExercise();
    }
  }

  startNewExercise() {
    const currentExercise = this.exercises[this.currentExerciseIndex];

    this.currentExerciseSets = [];

    for (let i = 1; i <= currentExercise.sets; i++) {
      this.currentExerciseSets.push({
        setActive: false,
        restActive: false,
      });
    }

    this.currentExerciseSets[0].setActive = true;
  }

  finishWorkout() {
    this.workoutInProgress = false;
    this.workoutTimer.unsubscribe();
    this.workoutTimerSeconds = 0;
    this.currentSetTimer.unsubscribe();
    this.currentSetTimerSeconds = 0;
    this.currentExerciseIndex = null;
    this.currentExerciseSets = [];
  }
}
