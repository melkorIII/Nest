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
    let token: string = this.getToken();
    return !helper.isTokenExpired(token);
  }
  userAuthentication(token: string) {
    let username: string | null = null;
    let decoded: any = helper.decodeToken(token);
    let admin: boolean = false;
    for (let claim in decoded) {
      if (claim.includes('name'))
        username = decoded[claim];
      if (claim.includes('role'))
        if (decoded[claim].filter((t: string) => t == 'admin').length == 1)
          admin = true;
    }
    if (username == null)
      throw new Error('Bad Token');
    this.localStorage.set(LOCAL_STORAGE_KEYS.USER, new User(username, token, admin, username[0].toUpperCase() + username.substring(1)));
  }
  getUser() {
    return (this.localStorage.get(LOCAL_STORAGE_KEYS.USER) as User).username;
  }
  getPersonification() {
    let personification: string = (this.localStorage.get(LOCAL_STORAGE_KEYS.USER) as User).personification;
    return personification;
  }
  public getToken() {
    try {
      return (this.localStorage.get(LOCAL_STORAGE_KEYS.USER) as User).token; 
    }
    catch {
      return '';
    }
  }
  getAdmin() {
    return (this.localStorage.get(LOCAL_STORAGE_KEYS.USER) as User).admin;
  }
  logout() {
    this.localStorage.remove(LOCAL_STORAGE_KEYS.USER);
  }
  setPersonification(personification: string) {
    let user: User = this.localStorage.get(LOCAL_STORAGE_KEYS.USER) as User;
    user.personification = personification;
    this.localStorage.set(LOCAL_STORAGE_KEYS.USER, user);
  }
  isPersonification(): boolean {
    let user: User = this.localStorage.get(LOCAL_STORAGE_KEYS.USER) as User;
    return user.username.toLocaleLowerCase() == user.personification.toLocaleLowerCase();
  }
}
