import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class JWTService {
  constructor(private readonly auth: AuthService) {}

  checkAuthToken(): string {
    if (this.auth.getAuthToken()) {
      return this.auth.getAuthToken();
    } else {
      return '';
    }
  }
}
