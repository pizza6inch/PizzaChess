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

export {
  registerPayload,
  getPlayerInfoPayload,
  createGamePayload,
  joinGamePayload,
  spectateGamePayload,
  leaveGamePayload,
  startGamePayload,
  makeMovePayload,
};
