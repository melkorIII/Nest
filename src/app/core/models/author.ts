
export class Author {
    AuthorName: string;
    AuthorId: number;    

    constructor(authorId: number, authorName: string) {
        this.AuthorId = authorId;
        this.AuthorName = authorName;
    }
}
