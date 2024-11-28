import { Component, inject } from '@angular/core';
import { AuthService } from './services/security/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public auth = inject(AuthService);
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home', subList: []},
    { title: 'Library', url: 'library', icon: 'library', open: false, subList: [
      { title: 'Books', url: 'library/books', icon: 'book'},
      { title: 'Authors', url: 'library/authors', icon: 'pencil'},
      { title: 'Series', url: 'library/series', icon: 'library'}
    ]},
  ];
  constructor() {}
}
