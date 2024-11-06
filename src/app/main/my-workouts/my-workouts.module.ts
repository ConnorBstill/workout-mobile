import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { MyWorkoutsComponent } from './my-workouts.component';

const routes: Routes = [
  {
    path: '',
    component: MyWorkoutsComponent,
  },
  {
    path: 'view-workout',
    loadChildren: () => import('./view-workout/view-workout.module').then((m) => m.ViewWorkoutModule),
  },
  {
    path: 'create-workout',
    loadChildren: () => import('./create-workout/create-workout.module').then((m) => m.CreateWorkoutModule),
  },
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, MatMenuModule, RouterModule.forChild(routes)],
  declarations: [MyWorkoutsComponent],
})
export class MyWorkoutsModule {}
