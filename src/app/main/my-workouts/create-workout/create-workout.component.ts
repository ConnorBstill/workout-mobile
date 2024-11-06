import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { RestService } from '../../../services/rest.service';

import { environment } from '../../../../environments/environment';

import { Exercise } from '../../../common/types/workouts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss'],
})
export class CreateWorkoutComponent {
  public exercises: Exercise[] = [];
  public selectedExercise: Exercise = null;

  public searchFormControl = new FormControl();
  public exerciseSearchSuggestions: Exercise[] = [];
  public filteredSuggestions: Observable<Exercise[]>;

  @ViewChild('workoutNameInput', { static: false }) workoutNameInput;

  constructor(
    private readonly rest: RestService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  ionViewWillEnter() {
    this.searchFormControl.valueChanges.subscribe((val) => {
      if (typeof val === 'string') {
        this.rest.get(`${environment.apiUrl}/api/exercise?query=${val}`).then((res) => {
          this.exerciseSearchSuggestions = res.data;

          this.exerciseSearchSuggestions.unshift(<Exercise>{ name: 'Search exercises' });

          this.filteredSuggestions = this.searchFormControl.valueChanges.pipe(
            startWith(''),
            map((value) => (typeof value === 'string' ? value : value.name)),
            map((name) => (name ? this.filter(name) : this.exerciseSearchSuggestions.slice()))
          );
        });
      } else {
        this.selectedExercise = val;
      }
    });
  }

  createWorkout(): void {
    const workoutName = this.workoutNameInput.el.firstElementChild.value;

    this.rest
      .post(`${environment.apiUrl}/api/workout`, {
        name: workoutName,
        scheduledDate: '2021-03-21 14:00:00',
      })
      .then((res) => {
        console.log(res);
        this.rest
          .post(`${environment.apiUrl}/api/workout/${res.data.newWorkoutId}/exercise`, {
            items: this.exercises,
          })
          .then((exerciseRes) => {
            this.router.navigate(['/app', 'my-workouts', 'view-workout'], {
              queryParams: {
                id: res.data.newWorkoutId,
                name: workoutName,
                scheduledDate: '2021-03-21 14:00:00',
              },
            });
          });
      });
  }

  filter(name: string): Exercise[] {
    const filterValue = name.toLowerCase();

    const array = this.exerciseSearchSuggestions.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );

    array.unshift(<Exercise>{ name: 'Search exercises' });

    return array;
  }

  displayFn(exercise: Exercise): string {
    return exercise && exercise.name ? exercise.name : '';
  }

  addExercise(suggestionName: string): void {
    if (suggestionName !== 'Search exercises') {
      this.exercises.push({
        ...this.selectedExercise,
        repsPerSet: 0,
        restTime: 0,
        weight: 0,
        sets: 0,
      });
    } else {
      this.dialog.open(SearchExercisesDialog, {
        height: '70%',
        width: '100%',
      });
    }

    this.searchFormControl.setValue('');
  }

  deleteExercise(index: number): void {
    this.exercises.splice(index, 1);
  }

  openEditExercise(exerciseIndex: number): void {
    const exercise = this.exercises[exerciseIndex];

    const dialogRef = this.dialog.open(EditExerciseDialog, {
      height: '70%',
      width: '100%',
      data: {
        name: exercise.name,
        weight: exercise.weight,
        repsPerSet: exercise.repsPerSet,
        sets: exercise.sets,
        restTime: exercise.restTime,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.exercises[exerciseIndex] = result;
    });
  }
}

@Component({
  selector: 'edit-exercise-dialog',
  templateUrl: 'edit-exercise-dialog.html',
})
export class EditExerciseDialog {
  @ViewChild('setsInput', { static: false }) setsInput;
  @ViewChild('repsInput', { static: false }) repsInput;
  @ViewChild('weightInput', { static: false }) weightInput;
  @ViewChild('restInput', { static: false }) restInput;

  constructor(
    public dialogRef: MatDialogRef<EditExerciseDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      sets: number;
      repsPerSet: number;
      weight: number;
      restTime: string;
      name: string;
    }
  ) {}

  changeSets(event): void {
    console.log(event);
  }

  close() {
    const sets = this.setsInput.nativeElement.firstElementChild.value;
    const repsPerSet = this.repsInput.nativeElement.firstElementChild.value;
    const weight = this.weightInput.nativeElement.firstElementChild.value;
    const restTime = this.restInput.nativeElement.firstElementChild.value;

    this.dialogRef.close({
      name: this.data.name,
      sets,
      repsPerSet,
      weight,
      restTime,
    });
  }

  cancel(): void {
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'search-exercises-dialog',
  templateUrl: 'search-exercises-dialog.html',
})
export class SearchExercisesDialog {
  selectEquipment() {}
}
