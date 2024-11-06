import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';

import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SettingsComponent }]),
    SettingsRoutingModule,
  ],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
