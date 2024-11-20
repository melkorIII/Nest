import { HttpRequestHandlerService } from './../utils/http-request-handler.service';
import { inject, Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { API_CONNECTION } from 'src/app/core/constants/constants';
import { Author } from 'src/app/core/models/author';
import { Book } from 'src/app/core/models/book';
import { BookDetails } from 'src/app/core/models/book-details';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private requestHandler = inject(HttpRequestHandlerService);
  private url: string = API_CONNECTION.URL;
  private controller: string = 'Library/'
  constructor() { }

  async GetBooks(order: string, mode: string, offset: number, next: number, search: string | null) {
    let request: string = `${this.controller}GetBooks`;
    request+= `?order=${order}&orderMode=${mode}&offset=${offset}&next=${next}`;
    if (search != null)
      request += `&search=${search}`;
    let result: Book[] = JSON.parse(await this.requestHandler.get(request, this.url));
    return result;
  }

  async GetBooksCount(): Promise<number> {
    let request: string = `${this.controller}GetBooksCount`;
    return JSON.parse(await this.requestHandler.get(request, this.url));
  }

  async GetBookDetails(bookId: number, user: string | null = null) {
    let request: string = `${this.controller}GetBookDetails`;
    request += `?bookId=${bookId}`;
    if (user != null)
      request += `&username=${user}`;
    return JSON.parse(await this.requestHandler.get(request, this.url)) as BookDetails;
  }

  async SaveBook(book: BookDetails) {
    let request: string = `${this.controller}SaveBook`;
    await this.requestHandler.post(request, JSON.stringify(book), this.url);
  }

  async GetAuthors(orderMode: string, offset: number, next: number, search: string | null = null) {
    let request: string = `${this.controller}GetAuthors`;
    request += `?orderMode=${orderMode}&offset=${offset}&next=${next}`;
    if (search != null)
      request += `&search=${search}`;
    return JSON.parse(await this.requestHandler.get(request, this.url));
  }

  async GetAuthorsCount() {
    let request: string = `${this.controller}GetAuthorsCount`;
    return JSON.parse(await this.requestHandler.get(request, this.url));
  }

  async SaveAuthor(author: Author) {
    let request: string = `${this.controller}SaveAuthor`;
    await this.requestHandler.post(request, JSON.stringify(author), this.url);
  }
}