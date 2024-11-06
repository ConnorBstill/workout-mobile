import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent {
  constructor(
    private readonly auth : AuthService,
    private readonly router: Router
  ) {}


  logout(): void {
    this.auth.logout();
    this.router.navigate(['login'])
  }
}
