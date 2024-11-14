import { inject, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert = inject(AlertController);

  constructor() { }

  async presentAlert(header: string, message: string) {
    let response: boolean = false;
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            response = true;
          }
        },
        {
          text: 'No',
          handler: () => {
            response = false;
          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss();
    return response;
  }
}
