import { Injectable, inject } from '@angular/core';
import { HttpRequestHandlerService } from '../utils/http-request-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private requestHandler = inject(HttpRequestHandlerService);

  constructor() { }

  async Login(username: string, password: string) {
    let request: string = `Access/Login?username=${username}&password=${password}`
    // let url: string = 'https://localhost:7101/'
    let url: string = 'https://nest-api.runasp.net/';
    return await this.requestHandler.get(request, url)
  }
}
