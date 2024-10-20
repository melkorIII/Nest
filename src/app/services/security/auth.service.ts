import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../utils/local-storage.service';
import { LOCAL_STORAGE_KEYS } from 'src/app/core/constants/constants';
import { User } from 'src/app/core/models/user';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorage: LocalStorageService) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !helper.isTokenExpired(token);
  }
  userAuthentication(token: string) {
    let username: string | null = null;
    let decoded: any = helper.decodeToken(token);
    for (let claim in decoded) {
      if (claim.includes('name'))
        username = decoded[claim];
    }
    if (username == null)
      throw new Error('Bad Token');
    this.localStorage.set(LOCAL_STORAGE_KEYS.USER, new User(username, token));
  }
  getUser() {
    return (this.localStorage.get(LOCAL_STORAGE_KEYS.USER) as User).username;
  }
  public getToken() {
    return (this.localStorage.get(LOCAL_STORAGE_KEYS.USER) as User).token;
  }
  logout() {
    this.localStorage.remove(LOCAL_STORAGE_KEYS.USER);
  }
}
