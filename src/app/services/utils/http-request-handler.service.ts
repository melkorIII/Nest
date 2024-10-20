import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../security/auth.service';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHandlerService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  constructor() { }

  async get(params: string, baseUrl: string) {
    try {
      let token: string = this.auth.getToken();
      const header = {
        'accept': 'text/plain',
        'Authorization': 'Bearer ' + token
      }
      return await firstValueFrom(
        this.http.get<string>(baseUrl + params, { headers: new HttpHeaders(header) }).pipe(
          tap({
            next: (data) => {return data},
          })
        )
      );
    } catch (error) {
      throw this.catchPromiseError(error);
    }
  }

  catchPromiseError(error: any) {
    if (!(error instanceof HttpErrorResponse))
      return new Error('Nessuna connessione');
    if (error.status == 404) {
      return new Error( error.message);
    } else if (error.status == 400) {
      return new Error(error.error);
    } else if (error.status == 401 || error.status == 403) {
      return new Error('Non autorizzato');
    } else {
        return new Error( 'Errore di connessione codice: ' + error.status);    
    }
  }

}
