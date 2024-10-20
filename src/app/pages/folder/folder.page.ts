import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessService } from 'src/app/services/nest-api/access.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private access = inject(AccessService)
  private auth = inject(AuthService)
  constructor() {}

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    let token: string = await this.access.Login('melkor','Fndgl$Mrkwwd');
    this.auth.userAuthentication(token);
  }
}
