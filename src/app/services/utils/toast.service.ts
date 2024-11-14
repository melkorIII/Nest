import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast = inject(ToastController);

  constructor() { }

  async presentToast(message: string, type: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass: 'toast-service',
      color: type
    });
    await toast.present();
  }
}
