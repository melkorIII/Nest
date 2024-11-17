import { Author } from "./author";
import { Book } from "./book";

export class BookDetails extends Book {
    ItalianVersion: boolean;
    Authors: Author[] | null;
    PhysicallyOwned: boolean | null;
    DigitallyOwned: boolean | null;
    OwnedBookId: number | null;
    ReadingDate: Date | null;
    ToRead: boolean | null;
    Position: number | null;
    SeriesName: string | null;
    SeriesId: number | null;
    LoanDate: Date | null;
    Loaner: string | null;
    LoanCounter: number | null;
    Notes: string | null;

    constructor(bookId: number, title: string, italianVersion: boolean, authors: Author[] | null, physicallyOwned: boolean,
        digitallyOwned: boolean, ownedBookId: number | null, readingDate: Date | null, toRead: boolean | null, position: number | null, 
        seriesName: string | null, seriesId: number | null,
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
        this.SeriesName = seriesName;
        this.SeriesId = seriesId;
        this.LoanDate = loanDate;
        this.Loaner = loaner;
        this.LoanCounter = loanCounter;
        this.Notes = notes;
    }
}
