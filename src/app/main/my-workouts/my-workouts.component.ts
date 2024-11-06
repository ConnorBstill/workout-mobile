import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestService } from '../../services/rest.service';

import { environment } from '../../../environments/environment';

import { Workout } from '../../common/types/workouts';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.scss'],
})
export class MyWorkoutsComponent {
  public workouts: Workout[] = [];

  constructor(private readonly rest: RestService, private readonly router: Router) {}

  ionViewWillEnter() {
    this.fetchWorkouts();
  }

  fetchWorkouts(): void {
    this.rest.get(`${environment.apiUrl}/api/workout`).then((res) => {
      console.log('MyWorkoutsComponent', res);
      this.workouts = res.data;
    });
  }

  viewWorkout(workout: Workout): void {
    this.router.navigate(['/app', 'my-workouts', 'view-workout'], {
      queryParams: workout,
    });
  }

  addWorkout() {
    this.router.navigate(['/app', 'my-workouts', 'create-workout']);
  }

  startWorkout(workout: Workout): void {
    this.router.navigate(['/app', 'my-workouts', 'view-workout'], {
      queryParams: { ...workout, startWorkout: true },
    });
  }

  deleteWorkout(id: number): void {
    this.rest.delete(`${environment.apiUrl}/api/workout/${id}`).then((res) => {
      this.fetchWorkouts();
    });
  }
}
