import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';
import { RestService } from '../services/rest.service';

@Component({
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss'],
})
export class RegisterConfirmComponent {
  public readonly registrationForm: FormGroup;

  public section: string = 'loginForm';

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly rest: RestService,
    private readonly route: ActivatedRoute,
    public readonly router: Router
  ) {
    this.registrationForm = this.fb.group({
      userName: [null, [Validators.required]],
      organizationName: [null, [Validators.required]],
      mobilePhoneNumber: [null, [Validators.required]],
      addressLine1: [null, [Validators.required]],
      addressLine2: [null, [Validators.required]],
      addressCity: [null, [Validators.required]],
      addressState: [null, [Validators.required]],
      addressPostalCode: [null, [Validators.required]],
    });
  }

  ionViewWillEnter() {}

  submit(): void {
    const { token: registrationToken } = this.route.snapshot.queryParams;

    this.rest
      .post(`${environment.apiUrl}/api/auth/register/confirm`, {
        ...this.registrationForm.value,
        registrationToken,
      })
      .then((res) => {
        this.authService.parseTokenAndSetState(res.data.jwt, res.data.refreshToken);
        this.router.navigate(['/app/messaging']);
      });
  }
}
