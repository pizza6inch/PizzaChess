import {User} from "./User";
import {Game} from "./Game"

export class lobby{
    private games:Game[]
    private users:User[]
    constructor() {
        this.games = []
        this.users = []
    }

    enter(socket:WebSocket):void {

    }
}