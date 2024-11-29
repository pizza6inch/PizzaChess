import { Chess } from "chess.js";

type RegisterSuccessPayload = {
  playerToken: string;
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

type AllGameStatusPayload = {
  games: GameInfo[];
};

type leaveGameSuccessPayload = {
  gameId: string;
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
  board: Chess["board"];
  moves: Chess["history"];
  isEnd: Chess["isGameOver"];
  remainingTime: number;
  gameState: string;
  isWhiteTurn: boolean;
};

type GameInfo = {
  gameId: string;
  white: player | null;
  black: player | null;
  spectators: player[];
  gameState: string;
};

type player = {
  id: string;
  displayName: string;
  rating: number;
  email: string;
  isInGame: boolean;
};

export type {
  GameDetailPayload,
  AllGameStatusPayload,
  RegisterSuccessPayload,
  CreateGameSuccessPayload,
  JoinGameSuccessPayload,
  SpectateGameSuccessPayload,
  StartGameSuccessPayload,
  leaveGameSuccessPayload,
  GameInfo,
  GameDetail,
  player,
};
