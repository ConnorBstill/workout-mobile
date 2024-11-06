import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ViewWorkoutComponent } from './view-workout.component';

const routes: Routes = [
  {
    path: '',
    component: ViewWorkoutComponent,
  },
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [ViewWorkoutComponent],
})
export class ViewWorkoutModule {}
