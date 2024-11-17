import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/core/models/book';
import { ListColumn } from 'src/app/core/models/list-column';
import { LibraryService } from 'src/app/services/nest-api/library.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent  implements OnInit {
  private libraryService = inject(LibraryService);
  private router = inject(Router);
  public columns: ListColumn[] = [ {name: 'Title', size: 6}, {name: 'Author', size: 6} ];
  public rows: Book[] = [];
  public pages: number = 0;
  public booksPerPage = 10;
  public selectedBook: Book | null = null;
  private order: string = 'title';
  private mode: string = 'asc';

  constructor() { }

  async ngOnInit() {
    this.getPages();
    this.GetBooks(1);
  }

  async getPages() {
    this.pages = Math.ceil(await this.libraryService.GetBooksCount() / 10);
  }

  async GetBooks(index: number) {
    this.rows = await this.libraryService.GetBooks(this.order, this.mode, (index - 1) * this.booksPerPage, this.booksPerPage, null, null)

  }

  previous(index: number) {
    this.selectedBook = null;
    this.GetBooks(index);
  }
  next(index: number) {
    this.selectedBook = null;
    this.GetBooks(index);
  }
  setBooksPerPage(number: number) {
    this.booksPerPage = number;
    this.selectedBook = null;
    this.GetBooks(1);
  }
  addBook(){
    this.router.navigate(['library/book/add']);
  }
  editBook() {
    this.router.navigate([`library/book/${this.selectedBook?.BookId}`])
  }
  changeOrder(order: string) {
    this.order = order.toLowerCase();
    this.GetBooks(1);
  }
  changeOrderMode(mode: string) {
    this.mode = mode.toLowerCase();
    this.GetBooks(1);
  }

}
