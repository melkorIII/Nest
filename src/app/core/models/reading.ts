export class Reading {
    ReadingId: number;
    ReadingDate: Date | null;
    ToRead: boolean;

    constructor(readingId: number, readingDate: Date | null, toRead: boolean) {
        this.ReadingId = readingId;
        this.ReadingDate = readingDate;
        this.ToRead = toRead;
    }
}
