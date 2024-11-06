import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RestService } from '../services/rest.service';
import { AuthService } from '../services/auth.service';

import { environment } from '../../environments/environment';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public readonly registrationForm: FormGroup;

  public section: string = 'loginForm';

  public invalidPasswordMessage: string = '';
  public passwordsDoNotMatchMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly rest: RestService,
    private readonly router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registrationForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      retypePassword: [null, [Validators.required]],
    });

    if (!environment.production) {
      this.registrationForm.setValue({
        email: 'taylor@lamarsoftware.io',
        password: 'password',
        retypePassword: 'password',
      });
    }
  }

  ionViewWillEnter() {
    this.registrationForm.valueChanges.subscribe((val) => {
      if (val.password && val.password.length < 8) {
        this.invalidPasswordMessage = 'Password must be longer than 8 characters';
      } else {
        this.invalidPasswordMessage = '';
      }

      if (val.password !== val.retypePassword) {
        this.passwordsDoNotMatchMessage = 'Passwords must match';
      } else {
        this.passwordsDoNotMatchMessage = '';
      }

      console.log(this.invalidPasswordMessage);
    });
  }

  submit(): void {
    this.rest.post(`${environment.apiUrl}/api/auth/register`, this.registrationForm.value).then((res) => {
      if (res.data) {
        this.authService.parseTokenAndSetState(res.data.jwt, res.data.refreshToken);
        this.router.navigate(['/app', 'my-workouts']);
      } else if (res.msg) {
        this.snackBar.open(
          res.msg, 
          'Dismiss', 
          { 
            duration: 4000, 
            panelClass: 'response-msg-dialog' 
          }
        )
      }
    });
  }
}
