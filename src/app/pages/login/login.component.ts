import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public loginForm: FormGroup;
  public loginError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}
  
  async login() {
    try {
      let token: string = await this.access.Login(this.loginForm.value.username, this.loginForm.value.password);
      this.auth.userAuthentication(token);
      this.router.navigate(['']);
    }
    catch(error: any) {
      this.loginError = error.message;
    }
  }

  ionViewDidEnter() {
    if(this.auth.isAuthenticated())
      this.router.navigate(['']);
  }
}
