import { Chess } from 'chess.js'

type RegisterSuccessPayload = {
  playerToken: string
  playerInfo: player
}

type CreateGameSuccessPayload = {
  gameId: string
  gameOwnerToken: string
  gameDetail: GameDetail
}

type JoinGameSuccessPayload = {
  gameId: string
  gameDetail: GameDetail
}

type SpectateGameSuccessPayload = {
  gameId: string
  gameDetail: GameDetail
}

type StartGameSuccessPayload = {
  gameId: string
  gameDetail: GameDetail
}

type leaveGameSuccessPayload = {
  gameId: string
}

type makeMoveSuccessPayload = {
  gameId: string
}

type AllGameStatusPayload = {
  games: GameInfo[]
}

type GameDetailPayload = {
  game: GameDetail
}

type GameDetail = {
  gameId: string
  gameOwnerToken: string
  white: player | null
  black: player | null
  spectators: player[]
  fen: string
  moves: string[]
  isEnd: boolean
  remainingTime: number
  gameState: 'waiting' | 'in-progress' | 'finished'
  isWhiteTurn: boolean
  winner: player | null
}

type GameInfo = {
  gameId: string
  white: player | null
  black: player | null
  spectators: player[]
  gameState: 'waiting' | 'in-progress' | 'finished'
}

type player = {
  id: string
  displayName: string
  rating: number
  email: string
  isInGame: boolean
}

export type {
  GameDetailPayload,
  AllGameStatusPayload,
  RegisterSuccessPayload,
  CreateGameSuccessPayload,
  JoinGameSuccessPayload,
  SpectateGameSuccessPayload,
  StartGameSuccessPayload,
  leaveGameSuccessPayload,
  makeMoveSuccessPayload,
  GameInfo,
  GameDetail,
  player,
}
