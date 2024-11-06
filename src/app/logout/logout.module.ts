import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LogoutRoutingModule } from './logout-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, ReactiveFormsModule, LogoutRoutingModule],
})
export class LogoutModule {}
