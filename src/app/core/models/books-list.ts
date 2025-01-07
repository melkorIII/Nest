import { Book } from "./book";

export class BooksList {
    Books: Book[];
    TotalCount: number;

    constructor(books: Book[], totalCount: number) {
        this.Books = books;
        this.TotalCount = totalCount;
    }
}
