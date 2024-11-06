import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
})
export class MainComponent {
  public adminFlag: boolean = false;

  constructor(private readonly auth: AuthService) {}

  ionViewWillEnter() {
    // this.adminFlag = this.auth.getUser().adminFlag;
  }
}
