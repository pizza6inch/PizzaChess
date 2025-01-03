import {
  registerPayload,
  getPlayerInfoPayload,
  createGamePayload,
  joinGamePayload,
  leaveGamePayload,
  spectateGamePayload,
  startGamePayload,
  makeMovePayload,
} from "../type";
import { errorHandler } from "../handler";

const jwt = require("jsonwebtoken");

import { WebSocket, RawData } from "ws";

import { Game } from "../Game";
import { User } from "../User";

const games = new Map<string, Game>(); // key: gameOwnerToken, value: Game
const users = new Map<string, User>(); // key: playerToken, value: User
const WebSockets: WebSocket[] = [];
let userCount = 0;
let gameCount = 0;

const register = (ws: WebSocket, payload: registerPayload) => {
  try {
    const { displayName, rating } = payload;

    if (WebSockets.includes(ws)) {
      throw new Error("user already registered");
    }

    WebSockets.push(ws);

    const userId = (userCount + 1).toString();
    userCount += 1;
    const user = new User(userId, displayName, rating, ws);

    const playerToken = generateToken(userId, displayName);

    users.set(playerToken, user);

    // send back to ws

    const response = {
      type: "registerSuccess",
      payload: {
        playerToken,
        playerInfo: user.getInfo(),
      },
    };

    ws.send(JSON.stringify(response));
    // console.log(JSON.stringify(response))

    broadcastAllGameStatus();
  } catch (e) {
    console.log(`errorMessage: register error ${e}`);
    errorHandler(ws, e, `register`);
  }
};

// 當斷線重連時 用playerToken重新加入ws
const getPlayerInfo = (ws: WebSocket, payload: getPlayerInfoPayload) => {
  try {
    const { playerToken } = payload;

    const user = users.get(playerToken);

    if (!user) {
      throw new Error("invalid playerToken");
    }

    if (!WebSockets.includes(ws)) {
      user.setNewWs(ws);
      WebSockets.push(ws);
    }

    // send back to ws

    const response = {
      type: "getPlayerInfoSuccess",
      payload: {
        playerInfo: user.getInfo(),
      },
    };

    ws.send(JSON.stringify(response));

    broadcastAllGameStatus();
  } catch (e) {
    console.log(`errorMessage: getUserInfoSuccess error ${e}`);
    errorHandler(ws, e, `getUserInfoSuccess`);
  }
};

const createGame = (ws: WebSocket, payload: createGamePayload) => {
  try {
    const { playerToken, playWhite, timeLimit = 60 * 10 } = payload;
    const user = users.get(playerToken);

    if (!user) {
      throw new Error("invalid playerToken");
    }

    if (!WebSockets.includes(ws)) {
      user.setNewWs(ws);
      WebSockets.push(ws);
    }

    // check if the user is already in a game
    if (user.isInGame) {
      throw new Error("user already in a game");
    }

    const gameId = gameCount.toString();
    gameCount += 1;
    const game = new Game(gameId, timeLimit);
    game.addPlayer(user, playWhite ? "white" : "black");
    user.isInGame = true;

    const gameOwnerToken = generateToken(game.gameId, user.id);

    game.setGameOwnerToken(gameOwnerToken);

    games.set(gameOwnerToken, game);

    const response = {
      type: "createGameSuccess",
      payload: {
        gameId,
        gameDetail: game.getGameDetail(),
        gameOwnerToken,
      },
    };

    ws.send(JSON.stringify(response));
    // console.log(JSON.stringify(response));

    broadcastAllGameStatus();
  } catch (e) {
    console.log(`errorMessage: createGameError ${e}`);
    errorHandler(ws, e, `CreateGame`);
  }
};

const joinGame = (ws: WebSocket, payload: joinGamePayload) => {
  try {
    const { playerToken, gameId } = payload;
    const user = users.get(playerToken);

    if (!user) {
      throw new Error("invalid playerToken");
    }

    if (!WebSockets.includes(ws)) {
      user.setNewWs(ws);
      WebSockets.push(ws);
    }

    // check if the user is already in a game
    if (user.isInGame) {
      throw new Error("user already in a game");
    }

    // const game = games.find((game) => game.gameId === gameId);
    const game = Array.from(games.values()).find((game) => game.gameId === gameId);

    if (!game) {
      throw new Error("game not found");
    }

    if (game.isPlayerInGame(user)) {
      throw new Error("user is already in the game");
    }

    if (game.white && game.black) {
      throw new Error("game is full");
    }

    if (game.white) {
      game.addPlayer(user, "black");
    } else if (game.black) {
      game.addPlayer(user, "white");
    }

    user.isInGame = true;

    const response = {
      type: "joinGameSuccess",
      payload: {
        gameId,
        gameDetail: game.getGameDetail(),
      },
    };
    ws.send(JSON.stringify(response));
    // console.log(JSON.stringify(response));

    broadcastAllGameStatus();
  } catch (e) {
    console.log(`errorMessage: joinGameError ${e}`);
    errorHandler(ws, e, `JoinGame`);
  }
};

const leaveGame = (ws: WebSocket, payload: leaveGamePayload) => {
  try {
    const { playerToken, gameId } = payload;
    const user = users.get(playerToken);

    if (!user) {
      throw new Error("invalid playerToken");
    }

    if (!WebSockets.includes(ws)) {
      user.setNewWs(ws);
      WebSockets.push(ws);
    }

    const game = Array.from(games.values()).find((game) => game.gameId === gameId);

    if (!game) {
      throw new Error("game not found");
    }

    if (!game.isPlayerInGame(user)) {
      throw new Error("user not in game");
    }

    game.leaveGame(user);

    console.log(games);
    console.log(game.getGameOwnerToken());

    if (game.getGameDetail().gameState === "finished" || (game.white === null && game.black === null)) {
      games.delete(game.getGameOwnerToken());
    }
    // console.log(games);

    user.isInGame = false;

    const response = {
      type: "leaveGameSuccess",
      payload: {
        gameId,
      },
    };

    // console.log(JSON.stringify(response));
    ws.send(JSON.stringify(response));

    broadcastAllGameStatus();
  } catch (e) {
    console.log(`errorMessage: leaveGameError ${e}`);
    errorHandler(ws, e, `LeaveGame`);
  }
};

const spectateGame = (ws: WebSocket, payload: spectateGamePayload) => {
  try {
    const { playerToken, gameId } = payload;
    const user = users.get(playerToken);

    if (!user) {
      throw new Error("invalid playerToken");
    }

    if (!WebSockets.includes(ws)) {
      user.setNewWs(ws);
      WebSockets.push(ws);
    }

    // check if the user is already in a game
    if (user.isInGame) {
      throw new Error("user already in a game");
    }

    const game = Array.from(games.values()).find((game) => game.gameId === gameId);

    if (!game) {
      throw new Error("game not found");
    }

    if (game.isPlayerInGame(user)) {
      throw new Error("user is already in the game");
    }

    game.addPlayer(user, "spectator");

    user.isInGame = true;

    const response = {
      type: "spectateGameSuccess",
      payload: {
        gameId,
        gameDetail: game.getGameDetail(),
      },
    };

    // console.log(JSON.stringify(response));
    ws.send(JSON.stringify(response));

    broadcastAllGameStatus();
  } catch (e) {
    console.log(`errorMessage: spectateGameError ${e}`);
    errorHandler(ws, e, `SpectateGame`);
  }
};

const startGame = (ws: WebSocket, payload: startGamePayload) => {
  try {
    const { playerToken, gameOwnerToken, gameId } = payload;

    const user = users.get(playerToken);

    if (!user) {
      throw new Error("user not found");
    }

    if (!WebSockets.includes(ws)) {
      user.setNewWs(ws);
      WebSockets.push(ws);
    }
    console.log(gameOwnerToken);

    const game = games.get(gameOwnerToken);

    if (!game) {
      throw new Error("game not found");
    }

    game.startGame();

    const response = {
      type: "startGameSuccess",
      payload: {
        gameId,
        game: game.getGameDetail(),
      },
    };
    // console.log(JSON.stringify(response));
    ws.send(JSON.stringify(response));

    broadcastAllGameStatus();

    broadcastGameDetail(game);
  } catch (e) {
    console.log(`errorMessage: startGameError ${e}`);
    errorHandler(ws, e, `StartGame`);
  }
};

const makeMove = (ws: WebSocket, payload: makeMovePayload) => {
  try {
    const { playerToken, gameId, move } = payload;

    const user = users.get(playerToken);

    if (!user) {
      throw new Error("user not found");
    }

    if (!WebSockets.includes(ws)) {
      user.setNewWs(ws);
      WebSockets.push(ws);
    }

    const game = Array.from(games.values()).find((game) => game.gameId === gameId);

    if (!game) {
      throw new Error("game not found");
    }

    game.makeMove(user, move);

    broadcastGameDetail(game);

    if (game.getGameDetail().gameState === "finished") {
      games.delete(game.getGameOwnerToken());
    }
  } catch (e) {
    console.log(`errorMessage: makeMoveError ${e}`);
    errorHandler(ws, e, `MakeMove`);
  }
};
const handleDisconnect = (ws: WebSocket) => {
  const index = WebSockets.indexOf(ws);
  if (index > -1) {
    WebSockets.splice(index, 1);
  }
  // we don't need to handle the user's game status when the user disconnects
  // beacause user can rejoin the game with the same playerToken
};

const generateToken = (id: string, dependency: string) => {
  const payload = {
    id,
    dependency,
  };

  const secretKey = "secretKey";
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
};

const broadcastAllGameStatus = () => {
  const type = "allGameStatus";
  const allGameStatus = Array.from(games.values()).map((game) => game.getGameInfo());

  const response = {
    type: type,
    payload: { games: allGameStatus },
  };

  for (const client of WebSockets) {
    client.send(JSON.stringify(response));
  }
  console.log(`broadcastAllGameStatus:`);
};

const broadcastGameDetail = (game: Game) => {
  const response = {
    type: "gameDetail",
    payload: {
      game: game.getGameDetail(),
    },
  };

  for (const player of [game.white, game.black]) {
    if (player) {
      player.ws.send(JSON.stringify(response));
    }
  }

  for (const spectator of game.spectators) {
    spectator.ws.send(JSON.stringify(response));
  }

  console.log(`broadcastGameDetail: `);
};

export {
  register,
  getPlayerInfo,
  createGame,
  joinGame,
  leaveGame,
  spectateGame,
  startGame,
  makeMove,
  handleDisconnect,
};
