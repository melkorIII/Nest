import { Ownership } from './ownership';
import { Author } from "./author";
import { Book } from "./book";
import { Reading } from "./reading";
import { Series } from "./series";

export class BookDetails extends Book {
    ItalianVersion: boolean;
    Authors: Author[];
    Series: Series | null;
    Reading: Reading | null;
    Position: number | null;
    Ownership: Ownership | null;
    LoanDate: Date | null;
    Loaner: string | null;
    LoanCounter: number | null;
    Notes: string | null;

    constructor(bookId: number, title: string, italianVersion: boolean, authors: Author[], series: Series | null, position: number | null,
                reading: Reading | null, ownership: Ownership | null, 
                loanDate: Date | null, loaner: string | null, loanCounter: number | null, notes: string | null
    ) {
        super(bookId, title);
        this.ItalianVersion = italianVersion;
        this.Authors = authors;
        this.Reading = reading;
        this.Position = position;
        this.Series = series;
        this.Ownership = ownership;
        this.LoanDate = loanDate;
        this.Loaner = loaner;
        this.LoanCounter = loanCounter;
        this.Notes = notes;
    }
}