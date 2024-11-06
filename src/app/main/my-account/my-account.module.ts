import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
  },
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, MatMenuModule, RouterModule.forChild(routes)],
  declarations: [MyAccountComponent],
})
export class MyAccountModule {}
