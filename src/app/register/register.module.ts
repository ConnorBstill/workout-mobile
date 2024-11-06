import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    IonicModule, 
    CommonModule, 
    ReactiveFormsModule, 
    RegisterRoutingModule,
    MatSnackBarModule
  ],
})
export class RegisterModule {}
