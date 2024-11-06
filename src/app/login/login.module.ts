import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { UiKitModule } from '../common/ui-kit';

@NgModule({
  declarations: [LoginComponent],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, UiKitModule, LoginRoutingModule],
})
export class LoginModule {}
