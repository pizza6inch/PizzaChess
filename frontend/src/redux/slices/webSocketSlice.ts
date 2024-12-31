import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
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
  GameInfo,
  GameDetail,
  player,
} from "../types/webSocket";

// 定義 Redux 狀態的型別
type InitialState = {
  games: GameInfo[]; // 通用訊息的陣列
  playerInfo: player;
  gameOwnerToken: string;
  currentGame: GameDetail | null;
  wsConnected: boolean;
};

// 定義初始狀態
const initialState: InitialState = {
  games: [],
  gameOwnerToken: "",
  playerInfo: {
    id: "",
    displayName: "",
    rating: 0,
    isInGame: false,
  },
  currentGame: null,
  wsConnected: false,
};

// 建立 WebSocket Slice
const webSocketSlice = createSlice({
  name: "WebSocket",
  initialState,
  reducers: {
    setWsConnected: (state, action: PayloadAction<boolean>) => {
      state.wsConnected = action.payload;
    },
    registerSuccess: (state, action: PayloadAction<RegisterSuccessPayload>) => {
      const { playerToken, playerInfo } = action.payload;
      state.playerInfo = playerInfo;
      sessionStorage.setItem("playerToken", playerToken);
    },
    getPlayerInfoSuccess: (
      state,
      action: PayloadAction<GetPlayerInfoSuccessPayload>,
    ) => {
      const { playerInfo } = action.payload;
      state.playerInfo = playerInfo;
    },
    createGameSuccess: (
      state,
      action: PayloadAction<CreateGameSuccessPayload>,
    ) => {
      const { gameDetail, gameOwnerToken } = action.payload;
      state.currentGame = gameDetail;
      state.gameOwnerToken = gameOwnerToken;
    },
    joinGameSuccess: (state, action: PayloadAction<JoinGameSuccessPayload>) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
    },
    spectateGameSuccess: (
      state,
      action: PayloadAction<SpectateGameSuccessPayload>,
    ) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
    },
    startGameSuccess: (
      state,
      action: PayloadAction<StartGameSuccessPayload>,
    ) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
    },
    leaveGameSuccess: (
      state,
      action: PayloadAction<leaveGameSuccessPayload>,
    ) => {
      // const { gameId } = action.payload;
      state.currentGame = null;
    },
    makeMoveSuccess: (state, action: PayloadAction<makeMoveSuccessPayload>) => {
      // const { gameId } = action.payload;
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
  setWsConnected,
  registerSuccess,
  getPlayerInfoSuccess,
  createGameSuccess,
  joinGameSuccess,
  spectateGameSuccess,
  setAllGameStatus,
  setGameDetail,
  startGameSuccess,
  leaveGameSuccess,
  makeMoveSuccess,
} = webSocketSlice.actions;

export default webSocketSlice;
