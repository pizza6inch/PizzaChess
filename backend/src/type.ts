type registerPayload = {
  displayName: string;
  email: string;
  rating: number;
  password: string;
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

export {
  registerPayload,
  CreateGamePayload,
  JoinGamePayload,
  spectateGamePayload,
  leaveGamePayload,
  startGamePayload,
  makeMovePayload,
};
