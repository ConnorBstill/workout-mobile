import { Injectable } from '@angular/core';

import { RestService } from './rest.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HelperAuthService {
  constructor(private readonly rest: RestService) {}

  login(payload: any): Promise<any> {
    return this.rest.post(`${environment.apiUrl}/api/auth/login`, payload);
  }

  signup(payload: any): Promise<any> {
    return this.rest.post(`${environment.apiUrl}/api/auth/signup`, payload);
  }

  setOrganizationAuth(organizationId: number): Promise<any> {
    return this.rest.post(`${environment.apiUrl}/api/auth/organization`, {
      organizationId,
    });
  }

  checkEmailAvailability(email: string): Promise<any> {
    return this.rest.get(`${environment.apiUrl}/api/auth/email/availability/${email}`);
  }

  requestForgotUsername(email: string): Promise<any> {
    return this.rest.post(`${environment.apiUrl}/api/auth/forgot-username/request`, { email });
  }

  requestResetPassword(email: string): Promise<any> {
    return this.rest.post(`${environment.apiUrl}/api/auth/reset-password/request`, { email });
  }

  confirmResetPassword(email: string, password: string, token: string): Promise<any> {
    return this.rest.put(`${environment.apiUrl}/api/auth/reset-password/confirm`, { email, password, token });
  }
}
