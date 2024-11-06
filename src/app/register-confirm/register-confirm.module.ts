import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegisterConfirmComponent } from './register-confirm.component';
import { RegisterConfirmRoutingModule } from './register-confirm-routing.module';

@NgModule({
  declarations: [RegisterConfirmComponent],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RegisterConfirmRoutingModule],
})
export class RegisterConfirmModule {}
