import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/security/auth.service';
import { AlertService } from 'src/app/services/utils/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title: string = 'Non configurato';
  private alert = inject(AlertService);
  private auth = inject(AuthService);
  private router = inject(Router)

  constructor() {
   }

  ngOnInit() {}

  async logout() {
    if (await this.alert.presentAlert('Logout', 'Exit from current session?')) {
      this.auth.logout();
      this.router.navigate(['login'])
    }
  }

}
