import { catchError } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/core/models/book';
import { ListColumn } from 'src/app/core/models/list-column';
import { LibraryService } from 'src/app/services/nest-api/library.service';
import { CatchErrorService } from 'src/app/services/utils/catch-error.service';
import { LoadingService } from 'src/app/services/utils/loading.service';
import { HeaderTitleService } from 'src/app/services/utils/header-title.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent  implements OnInit {
  private libraryService = inject(LibraryService);
  private router = inject(Router);
  private loading = inject(LoadingService);
  private error = inject(CatchErrorService);
  private header = inject(HeaderTitleService)
  public columns: ListColumn[] = [ {name: 'Title', size: 6, identifier: 'Title'}, {name: 'Author', size: 6, identifier: 'Author'} ];
  public rows: Book[] = [];
  public pages: number = 0;
  public booksPerPage = 10;
  public selectedBook: Book | null = null;
  private order: string = 'title';
  private mode: string = 'asc';

  constructor() { }

  async ngOnInit() {}

  async ionViewDidEnter() {
    this.header.setTitle('Books')
    try {
      await this.loading.present();
      this.selectedBook = null;
      await this.getPages();
      await this.GetBooks(1);
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }

  async getPages() {
    this.pages = Math.ceil(await this.libraryService.GetBooksCount() / this.booksPerPage);
  }

  async GetBooks(index: number, value: string | null = null) {
    this.rows = await this.libraryService.GetBooks(this.order, this.mode, (index - 1) * this.booksPerPage, this.booksPerPage, value);
  }

  async previous(index: number) {
    try {
    await this.loading.present();
    this.selectedBook = null;
    await this.GetBooks(index);
    }
    catch (error) {
      await this.error.catchError(error)
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async next(index: number) {
    try {
      await this.loading.present();
      this.selectedBook = null;
      await this.GetBooks(index);
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async setBooksPerPage(number: number) {
    try {
      await this.loading.present();
      this.booksPerPage = number;
      this.selectedBook = null;
      await this.GetBooks(1);
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss(); 
    }
  }
  addBook(){
    this.router.navigate(['library/book/add']);
  }
  editBook() {
    this.router.navigate([`library/book/${this.selectedBook?.BookId}`])
  }
  async changeOrder(order: string) {
    try {
      await this.loading.present();
      this.order = order.toLowerCase();
      await this.GetBooks(1);
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async changeOrderMode(mode: string) {
    try{
      await this.loading.present();
      this.mode = mode.toLowerCase();
      await this.GetBooks(1);
    }
    catch(error) {
      await this.error.catchError(error)
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async search(value: string) {
    try {
      await this.loading.present();
      await this.GetBooks(1, value);
    }
    catch (error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }

}