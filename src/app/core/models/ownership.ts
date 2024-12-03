export class Ownership {
    OwnedBookId: number;
    PhysicallyOwned: boolean;
    DigitallyOwned: boolean;

    constructor(ownedBookId: number, physicallyOwned: boolean, digitallyOwned: boolean) {
        this.OwnedBookId = ownedBookId;
        this.PhysicallyOwned = physicallyOwned;
        this.DigitallyOwned = digitallyOwned;
    }
}