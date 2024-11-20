export class ListColumn {
    name: string;
    identifier: string;
    size: number;

    constructor(name: string, size: number, identifier: string) {
        this.name = name;
        this.size = size;
        this.identifier = identifier;
    }
}