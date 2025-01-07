import { Author } from "./author";

export class AuthorsList {
    Authors: Author[];
    TotalCount: number;

    constructor(authors: Author[], totalCount: number) {
        this.Authors = authors;
        this.TotalCount = totalCount;
    }
}
