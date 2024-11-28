import { inject, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  private loading = inject(LoadingController)
  private isLoading: boolean = false;
  constructor() { }

  async present() {
    this.isLoading = true;
    return await this.loading.create({
      cssClass: 'custom-loading',
      spinner: null,
      translucent: true
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loading.dismiss().then(() => console.log('dismissed'));
  }

}
