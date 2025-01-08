type RegisterPayload = {
  displayName: string;
  rating: number;
};

type LoginPayload = {
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

export {
  RegisterPayload,
  LoginPayload,
  CreateGamePayload,
  JoinGamePayload,
  SpectateGamePayload,
  LeaveGamePayload,
  StartGamePayload,
  MakeMovePayload,
};
