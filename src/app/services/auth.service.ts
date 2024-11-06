import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { clone } from '../common/utils';

interface AuthUser {
  id: number;
  organizationId: number;
  adminFlag: boolean;
}

interface JwtPayload {
  exp: number;
  iat: number;

  id: number;
  organizationId: number;
  adminFlag: boolean;
}

@Injectable()
export class AuthService {
  public authToken: string = null;
  public refresh: string = null;
  public expires: number = 0;
  public user: AuthUser = null;

  protected readonly authTokenKey: string = '__ls_workcent_t';
  protected readonly expiresKey: string = '__ls_workcent_e';
  protected readonly refreshKey: string = '__ls_workcent_r';
  protected readonly userKey: string = '__ls_workcent_u';

  constructor(public readonly router: Router) {}

  loggedIn(): boolean {
    if (this.getAuthToken() && this.getUser()) {
      return true;
    } else {
      return false;
    }
  }

  setAuthToken(token: string): void {
    try {
      localStorage.setItem(this.authTokenKey, token);

      this.authToken = token;
    } catch (e) {
      this.defaultErrorHandler();
    }
  }

  getAuthToken(): string {
    try {
      if (localStorage.getItem(this.authTokenKey) && localStorage.getItem(this.authTokenKey) !== '') {
        const expires = Number(localStorage.getItem(this.expiresKey));
        const seconds = Math.floor(new Date().getTime() / 1000);

        if (seconds >= expires) {
          this.router.navigate(['/logout']);
          this.logout();
        } else {
          this.setAuthToken(localStorage.getItem(this.authTokenKey));
        }
      } else {
        return '';
      }
    } catch (e) {
      this.defaultErrorHandler();
    }

    return this.authToken;
  }

  setRefresh(refresh: string): void {
    try {
      localStorage.setItem(this.refreshKey, refresh);
      this.refresh = refresh;
    } catch (e) {
      this.defaultErrorHandler();
    }
  }

  getRefresh(): string {
    try {
      if (localStorage.getItem(this.refreshKey) && localStorage.getItem(this.refreshKey) !== '') {
        this.setRefresh(localStorage.getItem(this.refreshKey));
      }
    } catch (e) {
      this.defaultErrorHandler();
    }

    return this.refresh;
  }

  setExpires(expires: number): void {
    try {
      localStorage.setItem(this.expiresKey, String(expires));
      this.expires = expires;
    } catch (e) {
      this.defaultErrorHandler();
    }
  }

  getExpires(): number {
    try {
      if (localStorage.getItem(this.expiresKey) && localStorage.getItem(this.expiresKey) !== '') {
        this.setExpires(Number(localStorage.getItem(this.expiresKey)));
      }
    } catch (e) {
      this.defaultErrorHandler();
    }

    return this.expires;
  }

  setUser(user: AuthUser): void {
    try {
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.user = user;
    } catch (e) {
      this.defaultErrorHandler();
    }
  }

  getUser(): AuthUser {
    try {
      if (localStorage.getItem(this.userKey)) {
        this.user = JSON.parse(localStorage.getItem(this.userKey));
      }
    } catch (e) {
      this.defaultErrorHandler();
    }

    return clone(this.user);
  }

  parseTokenAndSetState(token: string, refreshToken: string): void {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload: JwtPayload = JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      )
    );

    console.log('parseTokenAndSetState', payload);

    this.setAuthToken(token);
    this.setRefresh(refreshToken);
    this.setExpires(payload.exp);
    this.setUser({
      id: payload.id,
      organizationId: payload.organizationId,
      adminFlag: payload.adminFlag,
    });
  }

  logout() {
    this.setAuthToken(null);
    this.setRefresh(null);
    this.setExpires(null);
    this.setUser(null);

    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.expiresKey);
    localStorage.removeItem(this.refreshKey);
    localStorage.removeItem(this.userKey);
  }

  defaultErrorHandler(): void {
    console.error('A generic REST error ocurred.');
  }
}
