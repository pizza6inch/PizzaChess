import { User } from "./User";

import { Chess } from "chess.js";

export class Game {
  public white: User | null; // 白棋玩家
  public black: User | null; // 黑棋玩家
  private gameOwnerToken: string; // 遊戲擁有者的 token
  public spectators: User[]; // 觀察者
  private remainingTime: number; // 剩餘時間
  private gameState: string; // 遊戲狀態，例如 "waiting", "in-progress", "finished"
  public gameId: string; // 房間 ID
  private isWhiteTurn: boolean; // 是否輪到白棋玩家
  private chess = new Chess(); // 棋盤

  constructor(gameId: string, private timeLimit: number = 300) {
    this.white = null;
    this.black = null;
    this.spectators = [];
    this.remainingTime = timeLimit;
    this.gameState = "waiting"; // 初始為等待狀態
    this.gameId = gameId;
    this.isWhiteTurn = true;
    this.gameOwnerToken = "";
  }

  // 玩家加入遊戲
  public addPlayer(user: User, role: "white" | "black" | "spectator"): boolean {
    if (this.gameState !== "waiting") {
      throw new Error("無法加入遊戲！");
      return false;
    }

    if (role === "white" && !this.white) {
      this.white = user;
      console.log(`${user.displayName} 加入為白棋玩家`);
      return true;
    } else if (role === "black" && !this.black) {
      this.black = user;
      console.log(`${user.displayName} 加入為黑棋玩家`);
      return true;
    } else if (role === "spectator") {
      this.spectators.push(user);
      console.log(`${user.displayName} 加入為觀察者`);
      return true;
    }

    throw new Error("無法加入遊戲！");
  }

  // 開始遊戲
  public startGame(): boolean {
    if (!this.white || !this.black) {
      throw new Error("玩家不足，無法開始遊戲！");
    }

    if (this.gameState !== "waiting") {
      throw new Error("遊戲已經開始！");
    }

    this.gameState = "in-progress";
    console.log("遊戲開始！");
    console.log(this.chess.ascii());

    return true;
  }

  // 玩家移動棋子
  public makeMove(user: User, move: string): boolean {
    if (this.gameState !== "in-progress") {
      throw new Error("遊戲尚未開始！");
    }

    if (user.id !== this.white?.id && user.id !== this.black?.id) {
      throw new Error("該玩家不再遊戲中！");
    }

    if (
      (this.isWhiteTurn && user.id !== this.white?.id) ||
      (!this.isWhiteTurn && user.id !== this.black?.id)
    ) {
      throw new Error("還沒輪到該玩家移動！");
    }

    // 移動邏輯

    console.log(`${user.displayName} 執行了移動：${move}`);
    return true;
  }

  // 離開遊戲
  public leaveGame(user: User): boolean {
    if (user.id === this.white?.id) {
      this.white = null;
      console.log(`${user.displayName} 離開了遊戲（白棋）`);
    } else if (user.id === this.black?.id) {
      this.black = null;
      console.log(`${user.displayName} 離開了遊戲（黑棋）`);
    } else {
      const index = this.spectators.findIndex(
        (spectator) => spectator.id === user.id
      );
      if (index !== -1) {
        this.spectators.splice(index, 1);
        console.log(`${user.displayName} 離開了觀察者名單`);
      } else {
        console.log("該玩家不在遊戲中！");
        return false;
      }
    }

    if (this.gameState === "in-progress" && (!this.white || !this.black)) {
      console.log("遊戲中玩家離開，遊戲結束！");
      this.gameState = "finished";
    }

    return true;
  }

  // 獲取遊戲資訊
  public getGameInfo() {
    return {
      gameId: this.gameId,
      white: this.white?.getInfo(),
      black: this.black?.getInfo(),
      spectators: this.spectators,
      gameState: this.gameState,
    };
  }

  public getGameDetail() {
    return {
      gameId: this.gameId,
      gameOwnerToken: this.gameOwnerToken,
      white: this.white?.getInfo(),
      black: this.black?.getInfo(),
      spectators: this.spectators.map((spectator) => spectator.getInfo()),
      borad: this.chess.board(),
      moves: this.chess.history(),
      isEnd: this.chess.isGameOver(),
      remainingTime: this.remainingTime,
      gameState: this.gameState,
      isWhiteTurn: this.isWhiteTurn,
    };
  }

  public isPlayerInGame(user: User): boolean {
    return (
      user.id === this.white?.id ||
      user.id === this.black?.id ||
      this.spectators.some((spectator) => spectator.id === user.id)
    );
  }

  public setGameOwnerToken(gameOwnerToken: string) {
    this.gameOwnerToken = gameOwnerToken;
  }
  public isMatchToken(token: string): boolean {
    return this.gameOwnerToken === token;
  }
}
