import { Injectable } from '@angular/core';

import { RestService } from './rest.service';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  constructor(private readonly rest: RestService) {}

  getRefUser(): Promise<any> {
    return this.rest.get(`${environment.apiUrl}/api/user`);
  }

  saveRefUser(payload): Promise<any> {
    return this.rest.put(`${environment.apiUrl}/api/user`, payload);
  }
}
