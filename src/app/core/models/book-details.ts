import { Author } from "./author";
import { Book } from "./book";
import { Series } from "./series";

export class BookDetails extends Book {
    ItalianVersion: boolean;
    Authors: Author[];
    Series: Series | null;
    PhysicallyOwned: boolean | null;
    DigitallyOwned: boolean | null;
    OwnedBookId: number | null;
    ReadingDate: Date | null;
    ToRead: boolean | null;
    Position: number | null;
    LoanDate: Date | null;
    Loaner: string | null;
    LoanCounter: number | null;
    Notes: string | null;

    constructor(bookId: number, title: string, italianVersion: boolean, authors: Author[], series: Series | null, physicallyOwned: boolean,
        digitallyOwned: boolean, ownedBookId: number | null, readingDate: Date | null, toRead: boolean | null, position: number | null,
        loanDate: Date | null, loaner: string | null, loanCounter: number | null, notes: string | null
    ) {
        super(bookId, title);
        this.ItalianVersion = italianVersion;
        this.Authors = authors;
        this.PhysicallyOwned = physicallyOwned;
        this.DigitallyOwned = digitallyOwned;
        this.OwnedBookId = ownedBookId;
        this.ReadingDate = readingDate;
        this.ToRead = toRead;
        this.Position = position;
        this.Series = series;
        this.LoanDate = loanDate;
        this.Loaner = loaner;
        this.LoanCounter = loanCounter;
        this.Notes = notes;
    }
}
