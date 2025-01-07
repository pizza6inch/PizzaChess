import { WebSocket, RawData } from "ws";

import {
  register,
  getPlayerInfo,
  getAllGamesStatus,
  createGame,
  joinGame,
  startGame,
  leaveGame,
  spectateGame,
  makeMove,
} from "./controllers/controller";

export const messageHandler = (ws: WebSocket, data: RawData) => {
  try {
    const { type, payload } = JSON.parse(data.toString());
    switch (type) {
      case "register":
        register(ws, payload);
        break;
      case "getPlayerInfo":
        getPlayerInfo(ws, payload);
        break;
      case "getAllGamesStatus":
        getAllGamesStatus(ws, payload);
        break;
      case "createGame":
        createGame(ws, payload);
        break;
      case "joinGame":
        joinGame(ws, payload);
        break;
      case "startGame":
        startGame(ws, payload);
        break;
      case "leaveGame":
        leaveGame(ws, payload);
        break;
      case "spectateGame":
        spectateGame(ws, payload);
        break;
      case "makeMove":
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
    type: "error",
    payload: { errorType, error },
  };

  ws.send(JSON.stringify(response));
};

// export function {messageHandler,errorHandler};
