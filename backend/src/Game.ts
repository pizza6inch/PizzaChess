import { User } from './User'

import { Chess } from 'chess.js'

export class Game {
  public white: User | null
  public black: User | null
  private gameOwnerToken: string
  public spectators: User[]
  private timeLimit: number
  private remainingTime: {
    white: number
    black: number
  }
  private gameState: 'waiting' | 'in-progress' | 'finished'
  public gameId: string
  private isWhiteTurn: boolean
  private chess = new Chess()
  private winner: User | null

  constructor(gameId: string, timeLimit: number = 300) {
    this.white = null
    this.black = null
    this.spectators = []
    this.timeLimit = timeLimit
    this.remainingTime = { white: timeLimit, black: timeLimit }
    this.gameState = 'waiting'
    this.gameId = gameId
    this.isWhiteTurn = true
    this.gameOwnerToken = ''
    this.winner = null
  }

  // 玩家加入遊戲
  public addPlayer(user: User, role: 'white' | 'black' | 'spectator'): boolean {
    if (role === 'white' && !this.white) {
      this.white = user
      console.log(`${user.displayName} 加入為白棋玩家`)
      return true
    } else if (role === 'black' && !this.black) {
      this.black = user
      console.log(`${user.displayName} 加入為黑棋玩家`)
      return true
    } else if (role === 'spectator') {
      this.spectators.push(user)
      console.log(`${user.displayName} 加入為觀察者`)
      return true
    }

    throw new Error('無法加入遊戲！')
  }

  // 開始遊戲
  public startGame(): boolean {
    if (!this.white || !this.black) {
      throw new Error("not enough player,can't start the game！")
    }

    if (this.gameState !== 'waiting') {
      throw new Error('the game has already started！')
    }

    this.gameState = 'in-progress'
    console.log('game start！')

    return true
  }

  // 玩家移動棋子
  public makeMove(user: User, move: { from: string; to: string; promotion?: string }): boolean {
    if (this.gameState !== 'in-progress') {
      throw new Error('game is not in progress！')
    }

    if (user.id !== this.white?.id && user.id !== this.black?.id) {
      throw new Error('the player is not in the game！')
    }

    if ((this.isWhiteTurn && user.id !== this.white?.id) || (!this.isWhiteTurn && user.id !== this.black?.id)) {
      throw new Error("it's not your turn！")
    }

    // 移動邏輯
    this.chess.move(move)
    if (this.chess.isGameOver()) {
      this.gameState = 'finished'
      if (this.chess.isCheckmate()) {
        this.winner = this.isWhiteTurn ? this.black : this.white
        console.log(`${this.winner?.displayName} win！`)
      } else {
        this.winner = null
        console.log('draw！')
      }
    }

    this.isWhiteTurn = !this.isWhiteTurn

    console.log(`${user.displayName} made move: ${move.from} -> ${move.to}`)
    return true
  }

  // 離開遊戲
  public leaveGame(user: User): boolean {
    if (user.id === this.white?.id) {
      this.white = null
      console.log(`${user.displayName} has left the game（white）`)
    } else if (user.id === this.black?.id) {
      this.black = null
      console.log(`${user.displayName} has left the game（black）`)
    } else {
      const index = this.spectators.findIndex(spectator => spectator.id === user.id)
      if (index !== -1) {
        this.spectators.splice(index, 1)
        console.log(`${user.displayName} has left the game（spectator）`)
      } else {
        console.log('the player is not in the game！')
        return false
      }
    }

    if (this.gameState === 'in-progress' && (!this.white || !this.black)) {
      console.log('game end！')
      this.gameState = 'finished'
    }

    return true
  }

  // 獲取遊戲資訊
  public getGameInfo() {
    return {
      gameId: this.gameId,
      white: this.white?.getInfo(),
      black: this.black?.getInfo(),
      spectators: this.spectators,
      gameState: this.gameState,
      timeLimit: this.timeLimit,
    }
  }

  public getGameDetail() {
    return {
      gameId: this.gameId,
      gameOwnerToken: this.gameOwnerToken,
      white: this.white?.getInfo(),
      black: this.black?.getInfo(),
      spectators: this.spectators.map(spectator => spectator.getInfo()),
      fen: this.chess.fen(),
      moves: this.chess.history(),
      isEnd: this.chess.isGameOver(),
      remainingTime: this.remainingTime,
      gameState: this.gameState,
      isWhiteTurn: this.isWhiteTurn,
      winner: this.winner?.getInfo(),
    }
  }

  public isPlayerInGame(user: User): boolean {
    return (
      user.id === this.white?.id ||
      user.id === this.black?.id ||
      this.spectators.some(spectator => spectator.id === user.id)
    )
  }

  public setGameOwnerToken(gameOwnerToken: string) {
    this.gameOwnerToken = gameOwnerToken
  }

  public getGameOwnerToken() {
    return this.gameOwnerToken
  }
  public isMatchToken(token: string): boolean {
    return this.gameOwnerToken === token
  }
}
