import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { firstValueFrom, tap } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHandlerService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  constructor() { }

  async get(params: string, baseUrl: string) {
    try {
      let token: string = this.auth.getToken();
      const header = {
        'accept': 'text/plain',
        'Authorization': 'Bearer ' + token
      }
      return JSON.stringify(await firstValueFrom(
        this.http.get<string>(baseUrl + params, { headers: new HttpHeaders(header) }).pipe(
          tap({
            next: (data) => {return data},
          })
        )
      ));
    } catch (error) {
      throw this.catchPromiseError(error);
    }
  }

  async post(params: string, body: string, baseUrl: string) {
    try {
      let token: string = this.auth.getToken();
      const header = {
        'accept': 'text/plain',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
      return JSON.stringify(await firstValueFrom(
        this.http.post<string>(baseUrl + params, body, { headers: new HttpHeaders(header) }).pipe(
          tap({
            next: (data) => {return data},
          })
        )
      ));
    } catch (error) {
      throw this.catchPromiseError(error);
    }
  }

  async catchPromiseError(error: any) {
    if (!(error instanceof HttpErrorResponse)) {
      await this.toast.presentToast('Nessuna connessione', 'danger');
      return new Error('');
    }      
    if (error.status == 404) {
      return new Error( error.message);
    } else if (error.status == 400 || error.status == 500) {
      return new Error(error.error);
    } else if (error.status == 401 || error.status == 403) {
      await this.toast.presentToast('Non autorizzato', 'warning');
      return new Error('');
    } else {
      await this.toast.presentToast('Errore di connessione', 'danger');
        return new Error('');
    }
  }

}
