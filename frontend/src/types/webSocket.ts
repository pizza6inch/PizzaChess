import { Chess } from "chess.js";

type registerPayload = {
  displayName: string;
  rating: number;
};

type getPlayerInfoPayload = {
  playerToken: string;
};

type createGamePayload = {
  playerToken: string;
  playWhite: boolean;
  timeLimit: number;
};

type joinGamePayload = {
  playerToken: string;
  gameId: string;
};

type spectateGamePayload = {
  playerToken: string;
  gameId: string;
};

type leaveGamePayload = {
  playerToken: string;
  gameId: string;
};

type startGamePayload = {
  playerToken: string;
  gameOwnerToken: string;
  gameId: string;
};

type makeMovePayload = {
  playerToken: string;
  gameId: string;
  move: {
    from: string;
    to: string;
    promotion?: string;
  };
};

type RegisterSuccessPayload = {
  playerToken: string;
  playerInfo: player;
};

type GetPlayerInfoSuccessPayload = {
  playerInfo: player;
};

type CreateGameSuccessPayload = {
  gameId: string;
  gameOwnerToken: string;
  gameDetail: GameDetail;
};

type JoinGameSuccessPayload = {
  gameId: string;
  gameDetail: GameDetail;
};

type SpectateGameSuccessPayload = {
  gameId: string;
  gameDetail: GameDetail;
};

type StartGameSuccessPayload = {
  gameId: string;
  gameDetail: GameDetail;
};

type leaveGameSuccessPayload = {
  gameId: string;
};

type makeMoveSuccessPayload = {
  gameId: string;
};

type AllGameStatusPayload = {
  games: GameInfo[];
};

type GameDetailPayload = {
  game: GameDetail;
};

type GameDetail = {
  gameId: string;
  gameOwnerToken: string;
  white: player | null;
  black: player | null;
  spectators: player[];
  fen: string;
  moves: string[];
  isEnd: boolean;
  timeLimit: number;
  remainingTime: {
    white: number;
    black: number;
  };
  gameState: "waiting" | "in-progress" | "finished";
  isWhiteTurn: boolean;
  winner: player | null;
};

type GameInfo = {
  gameId: string;
  white: player | null;
  black: player | null;
  spectators: player[];
  gameState: "waiting" | "in-progress" | "finished";
  timeLimit: number;
};

type player = {
  id: string;
  displayName: string;
  rating: number;
  isInGame: boolean;
};

export type {
  GameDetailPayload,
  AllGameStatusPayload,
  RegisterSuccessPayload,
  GetPlayerInfoSuccessPayload,
  CreateGameSuccessPayload,
  JoinGameSuccessPayload,
  SpectateGameSuccessPayload,
  StartGameSuccessPayload,
  leaveGameSuccessPayload,
  makeMoveSuccessPayload,
  registerPayload,
  getPlayerInfoPayload,
  createGamePayload,
  joinGamePayload,
  spectateGamePayload,
  leaveGamePayload,
  startGamePayload,
  makeMovePayload,
  GameInfo,
  GameDetail,
  player,
};
