type RegisterPayload = {
  displayName: string;
  rating: number;
};

type LoginPayload = {
  playerToken: string;
};

type GetPlayerInfoPayload = {
  playerToken: string;
};

type CreateGamePayload = {
  playerToken: string;
  playWhite: boolean;
  timeLimit: number;
};

type JoinGamePayload = {
  playerToken: string;
  gameId: string;
};

type SpectateGamePayload = {
  playerToken: string;
  gameId: string;
};

type LeaveGamePayload = {
  playerToken: string;
  gameId: string;
};

type StartGamePayload = {
  playerToken: string;
  gameOwnerToken: string;
  gameId: string;
};

type MakeMovePayload = {
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
  playerInfo: Player;
};

type LoginSuccessPayload = {
  playerInfo: Player;
  currentGame: GameDetail | null;
  games: GameInfo[];
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

type LeaveGameSuccessPayload = {
  gameId: string;
};

type MakeMoveSuccessPayload = {
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
  white: Player | null;
  black: Player | null;
  spectators: Player[];
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
  winner: Player | null;
};

type GameInfo = {
  gameId: string;
  white: Player | null;
  black: Player | null;
  spectators: Player[];
  gameState: "waiting" | "in-progress" | "finished";
  timeLimit: number;
};

type Player = {
  id: string;
  displayName: string;
  rating: number;
  isInGame: boolean;
};

export type {
  GameDetailPayload,
  AllGameStatusPayload,
  RegisterSuccessPayload,
  LoginSuccessPayload,
  CreateGameSuccessPayload,
  JoinGameSuccessPayload,
  SpectateGameSuccessPayload,
  StartGameSuccessPayload,
  LeaveGameSuccessPayload,
  MakeMoveSuccessPayload,
  RegisterPayload,
  LoginPayload,
  GetPlayerInfoPayload,
  CreateGamePayload,
  JoinGamePayload,
  SpectateGamePayload,
  LeaveGamePayload,
  StartGamePayload,
  MakeMovePayload,
  GameInfo,
  GameDetail,
  Player,
};
