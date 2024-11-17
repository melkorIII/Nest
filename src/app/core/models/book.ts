
export class Book {
    BookId: number;
    Title: string;
    Author: string | null;

    constructor(bookId: number, book: string, author?: string | null) {
        this.BookId = bookId;
        this.Title = book;
        this.Author = author? author : null;
    }
}
