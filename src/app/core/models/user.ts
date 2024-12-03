export class User {
    username: string;
    token: string;
    admin: boolean;
    personification: string;

    constructor(username: string, token: string, admin: boolean, personification: string) {
        this.username = username;
        this.token = token;
        this.admin = admin;
        this.personification = personification;
    }
}
