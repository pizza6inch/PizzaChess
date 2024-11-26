
export class User {
    public id: string;
    public displayName: string;
    private email: string;
    private rating: Number;
    private ws:WebSocket;
    constructor(id: string, displayName: string, email: string, rating: number,ws:WebSocket) {
        this.id = id;
        this.displayName = displayName;
        this.email = email;
        this.rating = rating;
        this.ws = ws
    }


}