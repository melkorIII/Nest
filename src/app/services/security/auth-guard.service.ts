import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastService } from '../utils/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private toast = inject(ToastService);

  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(): Promise<boolean> {
    if (!this.auth.isAuthenticated()) {
      await this.toast.presentToast('Sessione scaduta', 'warning')
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
