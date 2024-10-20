import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/nest-api/access.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  private access = inject(AccessService);
  private auth = inject(AuthService);
  private router = inject(Router)
  public username: string = '';
  public password: string = '';

  constructor() { }

  ngOnInit() {}
  
  async login() {
    let token: string = await this.access.Login(this.username!, this.password!);
    this.auth.userAuthentication(token);
    this.router.navigate(['']);
  }
}
