import { Component, ComponentRef, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/nest-api/access.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { LoadingService } from 'src/app/services/utils/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  private access = inject(AccessService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private loading = inject(LoadingService)
  public loginEnabler: boolean = false;
  public loginForm: FormGroup;
  public loginError: string | null = null;
  track: Howl;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.track = new Howl({
      src: ['assets/media/Silvester Anfang.mp3'],
      html5: true,
      loop: true
    })
  }

  ngOnInit() {}
  
  async login() {
    try {
      await this.loading.present();
      let token: string = await this.access.Login(this.loginForm.value.username, this.loginForm.value.password);
      this.auth.userAuthentication(token);
      this.loginForm.reset();
      this.loginEnabler = false;
      this.router.navigate(['']);
      await this.loading.dismiss();
    }
    catch(error: any) {
      await this.loading.dismiss();
      this.loginError = error.message;
    }
  }

  ionViewDidEnter() {
    if(this.auth.isAuthenticated())
      this.router.navigate(['']);
  }
  ionViewWillLeave() {
    this.track.stop();
  }
  enableLogin() {
    this.track.play();
    this.loginEnabler = true;
  }
}
