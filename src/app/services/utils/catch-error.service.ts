import { Injectable, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CatchErrorService {
  private toast = inject(ToastService);

  constructor() { }

  async catchError(error: any) {
    if (error instanceof Error)
      if (error.message != '')
        if (error.cause == 400)
          await this.toast.presentToast(error.message, 'danger')
        else
          await this.toast.presentToast(error.message, 'warning');
    if (!(error instanceof Error))
      await this.toast.presentToast(error, 'danger');
  }

}
