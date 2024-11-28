import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/core/models/book';
import { ListColumn } from 'src/app/core/models/list-column';
import { LibraryService } from 'src/app/services/nest-api/library.service';
import { LoadingService } from 'src/app/services/utils/loading.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent  implements OnInit {
  private libraryService = inject(LibraryService);
  private router = inject(Router);
  private loading = inject(LoadingService);
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
    await this.loading.present();
    this.selectedBook = null;
    await this.getPages();
    await this.GetBooks(1);
    await this.loading.dismiss();
  }

  async getPages() {
    this.pages = Math.ceil(await this.libraryService.GetBooksCount() / this.booksPerPage);
  }

  async GetBooks(index: number, value: string | null = null) {
    this.rows = await this.libraryService.GetBooks(this.order, this.mode, (index - 1) * this.booksPerPage, this.booksPerPage, value);
  }

  async previous(index: number) {
    await this.loading.present();
    this.selectedBook = null;
    await this.GetBooks(index);
    await this.loading.dismiss();
  }
  async next(index: number) {
    await this.loading.present();
    this.selectedBook = null;
    await this.GetBooks(index);
    await this.loading.dismiss();
  }
  async setBooksPerPage(number: number) {
    await this.loading.present();
    this.booksPerPage = number;
    this.selectedBook = null;
    await this.GetBooks(1);
    await this.loading.dismiss();
  }
  addBook(){
    this.router.navigate(['library/book/add']);
  }
  editBook() {
    this.router.navigate([`library/book/${this.selectedBook?.BookId}`])
  }
  async changeOrder(order: string) {
    await this.loading.present();
    this.order = order.toLowerCase();
    await this.GetBooks(1);
    await this.loading.dismiss();
  }
  async changeOrderMode(mode: string) {
    await this.loading.present();
    this.mode = mode.toLowerCase();
    await this.GetBooks(1);
    await this.loading.dismiss();
  }
  async search(value: string) {
    await this.loading.present();
    await this.GetBooks(1, value);
    await this.loading.dismiss();
  }

}
