import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { CreateWorkoutComponent } from './create-workout.component';

const routes: Routes = [
  {
    path: '',
    component: CreateWorkoutComponent,
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CreateWorkoutComponent],
})
export class CreateWorkoutModule {}
