import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ionViewWillEnter() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
