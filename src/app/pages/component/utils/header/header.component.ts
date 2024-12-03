import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AccessService } from 'src/app/services/nest-api/access.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { AlertService } from 'src/app/services/utils/alert.service';
import { HeaderTitleService } from 'src/app/services/utils/header-title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title: string = 'Non configurato';
  private alert = inject(AlertService);
  private headerTitle = inject(HeaderTitleService)
  public auth = inject(AuthService);
  private router = inject(Router)
  private access = inject(AccessService);
  public route = inject(Router);
  users: string[] = [];

  constructor() {}

  async ngOnInit() {
    this.headerTitle.titleObs.subscribe((title) => {
      this.title = title;
    });
    this.users = await this.access.getUsers();
  }

  async logout() {
    if (await this.alert.presentAlert('Logout', 'Exit from current session?')) {
      this.auth.logout();
      this.router.navigate(['login'])
    }
  }

  changePersonification(user: any) {
    this.auth.setPersonification(user.detail.value);
    location.reload();
  }

}
