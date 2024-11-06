import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          redirectUrl: state.url,
        },
        queryParamsHandling: 'merge',
      });

      return false;
    }
  }
}
