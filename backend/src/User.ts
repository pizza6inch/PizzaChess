import WebSocket from 'ws'

export class User {
  public id: string
  public displayName: string
  private email: string
  private rating: Number
  public ws: WebSocket
  public isInGame: boolean

  constructor(id: string, displayName: string, email: string, rating: number, ws: WebSocket) {
    this.id = id
    this.displayName = displayName
    this.email = email
    this.rating = rating
    this.ws = ws
    this.isInGame = false
  }

  public setNewWs(ws: WebSocket) {
    this.ws = ws
  }

  public getInfo() {
    return {
      id: this.id,
      displayName: this.displayName,
      email: this.email,
      rating: this.rating,
      isInGame: this.isInGame,
    }
  }
}
