import { WebSocket, RawData } from "ws";

import { register, createGame, joinGame, startGame, leaveGame, spectateGame, makeMove, login } from "./controller";

export const messageHandler = (ws: WebSocket, data: RawData) => {
  try {
    const { type, payload } = JSON.parse(data.toString());
    if (type === "SPECTATE_GAME") console.log(payload);

    switch (type) {
      case "REGISTER":
        register(ws, payload);
        break;
      case "LOGIN":
        login(ws, payload);
        break;
      case "CREATE_GAME":
        createGame(ws, payload);
        break;
      case "JOIN_GAME":
        joinGame(ws, payload);
        break;
      case "START_GAME":
        startGame(ws, payload);
        break;
      case "LEAVE_GAME":
        leaveGame(ws, payload);
        break;
      case "SPECTATE_GAME":
        spectateGame(ws, payload);
        break;
      case "MAKE_MOVE":
        makeMove(ws, payload);
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(`errorMessage: ${e}`);
    errorHandler(ws, e, `please check the message format`);
  }
};

export const errorHandler = (ws: WebSocket, e: any, errorType: string) => {
  const error = `${e instanceof Error ? e.message : e.toString()}`;

  const response = {
    type: "ERROR",
    payload: { errorType, error },
  };

  ws.send(JSON.stringify(response));
};

// export function {messageHandler,errorHandler};
