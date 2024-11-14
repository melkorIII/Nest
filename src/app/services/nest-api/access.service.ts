import { Injectable, inject } from '@angular/core';
import { HttpRequestHandlerService } from '../utils/http-request-handler.service';
import { API_CONNECTION } from 'src/app/core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private requestHandler = inject(HttpRequestHandlerService);
  private url: string = API_CONNECTION.URL;

  constructor() { }

  async Login(username: string, password: string) {
    let request: string = `Access/Login?username=${username}&password=${password}`
    return JSON.parse(await this.requestHandler.get(request, this.url));
  }
}
