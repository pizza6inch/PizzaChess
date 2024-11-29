import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
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
} from "./types";

// 定義 Redux 狀態的型別
type InitialState = {
  games: GameInfo[]; // 通用訊息的陣列
  playerInfo: player;
  playerToken: string;
  currentGame: GameDetail | null;
};

// 定義初始狀態
const initialState: InitialState = {
  games: [],
  playerToken: "",
  playerInfo: {
    id: "",
    displayName: "",
    rating: 0,
    email: "",
    isInGame: false,
  },
  currentGame: null,
};

// 建立 WebSocket Slice
const webSocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<RegisterSuccessPayload>) => {
      const { playerToken } = action.payload;
      state.playerToken = playerToken;
    },
    createGameSuccess: (
      state,
      action: PayloadAction<CreateGameSuccessPayload>
    ) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
    },
    joinGameSuccess: (state, action: PayloadAction<JoinGameSuccessPayload>) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
    },
    spectateGameSuccess: (
      state,
      action: PayloadAction<SpectateGameSuccessPayload>
    ) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
    },
    startGameSuccess: (
      state,
      action: PayloadAction<StartGameSuccessPayload>
    ) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
    },
    leaveGameSuccess: (
      state,
      action: PayloadAction<leaveGameSuccessPayload>
    ) => {
      const { gameId } = action.payload;
      state.currentGame = null;
    },
    setAllGameStatus: (state, action: PayloadAction<AllGameStatusPayload>) => {
      const { games } = action.payload;
      state.games = games;
    },
    setGameDetail: (state, action: PayloadAction<GameDetailPayload>) => {
      const { game } = action.payload;
      state.currentGame = game;
    },
  },
});

// 匯出 actions
export const {
  registerSuccess,
  createGameSuccess,
  joinGameSuccess,
  spectateGameSuccess,
  setAllGameStatus,
  setGameDetail,
  startGameSuccess,
  leaveGameSuccess,
} = webSocketSlice.actions;

export default webSocketSlice;