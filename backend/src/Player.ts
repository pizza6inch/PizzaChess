import WebSocket from "ws";

export class Player {
  public id: string;
  public displayName: string;
  private rating: number;
  public ws: WebSocket;
  public isInGame: boolean;
  private gameOwnerToken: string | null;

  constructor(id: string, displayName: string, rating: number, ws: WebSocket) {
    this.id = id;
    this.displayName = displayName;
    this.rating = rating;
    this.ws = ws;
    this.isInGame = false;
    this.gameOwnerToken = null;
  }

  public setNewWs(ws: WebSocket) {
    this.ws = ws;
  }

  public setGameOwnerToken(token: string) {
    this.gameOwnerToken = token;
  }

  public getInfo() {
    return {
      id: this.id,
      displayName: this.displayName,
      rating: this.rating,
      isInGame: this.isInGame,
      gameOwnerToken: this.gameOwnerToken,
    };
  }

  public lose() {
    this.isInGame = false;
    this.rating -= 10;
  }

  public win() {
    this.isInGame = false;
    this.rating += 10;
  }
}
