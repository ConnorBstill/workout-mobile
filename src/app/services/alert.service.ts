import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { RestResponse } from '../common/types/rest';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private readonly toast: ToastController) {}

  async createDynamicToast(restResponse: RestResponse): Promise<HTMLIonToastElement> {
    if (restResponse && restResponse.msg) {
      const toast = await this.toast.create({
        message: restResponse.msg,
        duration: 3000,
        color: 'dark',
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
          },
        ],
      });

      toast.present();

      return toast;
    } else {
      return null;
    }
  }
}
