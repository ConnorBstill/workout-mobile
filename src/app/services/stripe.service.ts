import { Injectable } from '@angular/core';

import { RestService } from './rest.service';

import { environment } from '../../environments/environment';

@Injectable()
export class StripeService {
  constructor(private readonly rest: RestService) {}

  getApplicationId(): Promise<any> {
    return this.rest.get(`${environment.apiUrl}/api/stripe/client-token`);
  }

  createPayment(payload): Promise<any> {
    return this.rest.post(`${environment.apiUrl}/api/stripe`, payload);
  }

  getCustomerRef(): Promise<any> {
    return this.rest.get(`${environment.apiUrl}/api/stripe/customer`);
  }

  getSubscription(): Promise<any> {
    return this.rest.get(`${environment.apiUrl}/api/stripe/subscription`);
  }

  updateSubscription(planId: string): Promise<any> {
    return this.rest.put(`${environment.apiUrl}/api/stripe/subscription`, { planId });
  }

  updateCard(token: string): Promise<any> {
    return this.rest.put(`${environment.apiUrl}/api/stripe/card`, {
      token,
    });
  }
}
