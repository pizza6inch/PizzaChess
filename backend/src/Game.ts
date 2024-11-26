import { User } from './User';

export class Game {
    private white: User | null; // 白棋玩家
    private black: User | null; // 黑棋玩家
    private spectators: User[]; // 觀察者
    private moves: string[]; // 移動記錄
    private remainingTime: number; // 剩餘時間
    private gameState: string; // 遊戲狀態，例如 "waiting", "in-progress", "finished"

    constructor(private roomId: string, private timeLimit: number = 300) {
        this.white = null;
        this.black = null;
        this.spectators = [];
        this.moves = [];
        this.remainingTime = timeLimit;
        this.gameState = "waiting"; // 初始為等待狀態
    }

    // 玩家加入遊戲
    public addPlayer(user: User, color: "white" | "black" | "spectator"): boolean {
        if (this.gameState !== "waiting") {
            console.log("遊戲已開始，無法加入！");
            return false;
        }

        if (color === "white" && !this.white) {
            this.white = user;
            console.log(`${user.displayName} 加入為白棋玩家`);
            return true;
        } else if (color === "black" && !this.black) {
            this.black = user;
            console.log(`${user.displayName} 加入為黑棋玩家`);
            return true;
        } else if (color === "spectator") {
            this.spectators.push(user);
            console.log(`${user.displayName} 加入為觀察者`);
            return true;
        }

        console.log("加入失敗：顏色已被選擇或無法加入");
        return false;
    }

    // 開始遊戲
    public startGame(): boolean {
        if (!this.white || !this.black) {
            console.log("玩家不足，無法開始遊戲！");
            return false;
        }

        if (this.gameState !== "waiting") {
            console.log("遊戲已經開始！");
            return false;
        }

        this.gameState = "in-progress";
        console.log("遊戲開始！");
        return true;
    }

    // 玩家移動棋子
    public makeMove(user: User, move: string): boolean {
        if (this.gameState !== "in-progress") {
            console.log("遊戲尚未開始或已結束！");
            return false;
        }

        if (user.id !== this.white?.id && user.id !== this.black?.id) {
            console.log("該玩家不在遊戲中！");
            return false;
        }

        // 記錄移動
        this.moves.push(move);
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
            const index = this.spectators.findIndex((spectator) => spectator.id === user.id);
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
            roomId: this.roomId,
            white: this.white,
            black: this.black,
            spectators: this.spectators,
            moves: this.moves,
            remainingTime: this.remainingTime,
            gameState: this.gameState,
        };
    }
}
