import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuardService } from './services/security/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/library/books/books.component';
import { BookDetailsComponent } from './pages/library/book-details/book-details.component';
import { AuthorsComponent } from './pages/library/authors/authors.component';
import { SeriesComponent } from './pages/library/series/series.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'library/books',
    component: BooksComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'library/book/:id',
    component: BookDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'library/authors',
    component: AuthorsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'library/series',
    component: SeriesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
