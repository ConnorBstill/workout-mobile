import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { RestService } from '../services/rest.service';

import { environment } from '../../environments/environment';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public readonly loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly rest: RestService,
    private readonly fb: FormBuilder,
    public readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  handleLoginClick(): void {
    this.rest.post(`${environment.apiUrl}/api/auth/login`, this.loginForm.value).then((res) => {
      if (res.data && res.data.jwt && res.data.refreshToken) {
        this.authService.parseTokenAndSetState(res.data.jwt, res.data.refreshToken);
        this.router.navigate(['/app', 'my-workouts']);
      }
    });
  }
}
