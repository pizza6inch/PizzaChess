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
} from "@/types/webSocket";

// 定義 Redux 狀態的型別
type InitialState = {
  games: GameInfo[] | null; // 通用訊息的陣列
  playerInfo: player;
  gameOwnerToken: string;
  currentGame: GameDetail | null;
  wsConnected: boolean;
  isfetching: boolean;
};

// 定義初始狀態
const initialState: InitialState = {
  games: null,
  gameOwnerToken: "",
  playerInfo: {
    id: "",
    displayName: "",
    rating: 0,
    isInGame: false,
  },
  currentGame: null,
  wsConnected: false,
  isfetching: false,
};

// 建立 WebSocket Slice
const webSocketSlice = createSlice({
  name: "WebSocket",
  initialState,
  reducers: {
    setWsConnected: (state, action: PayloadAction<boolean>) => {
      state.wsConnected = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isfetching = action.payload;
    },
    registerSuccess: (state, action: PayloadAction<RegisterSuccessPayload>) => {
      const { playerToken, playerInfo } = action.payload;
      state.playerInfo = playerInfo;
      sessionStorage.setItem("playerToken", playerToken);
      state.isfetching = false;
    },
    getPlayerInfoSuccess: (
      state,
      action: PayloadAction<GetPlayerInfoSuccessPayload>,
    ) => {
      const { playerInfo, currentGame } = action.payload;
      state.playerInfo = playerInfo;
      state.currentGame = currentGame;
      state.isfetching = false;
    },
    getPlayerInfoFailed: (state, action: PayloadAction<{}>) => {
      sessionStorage.removeItem("playerToken");
      window.location.reload(); // 重新整理頁面
      state.isfetching = false;
    },
    createGameSuccess: (
      state,
      action: PayloadAction<CreateGameSuccessPayload>,
    ) => {
      const { gameDetail, gameOwnerToken } = action.payload;
      state.currentGame = gameDetail;
      state.gameOwnerToken = gameOwnerToken;
      state.isfetching = false;
    },
    joinGameSuccess: (state, action: PayloadAction<JoinGameSuccessPayload>) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
      state.isfetching = false;
    },
    spectateGameSuccess: (
      state,
      action: PayloadAction<SpectateGameSuccessPayload>,
    ) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
      state.isfetching = false;
    },
    startGameSuccess: (
      state,
      action: PayloadAction<StartGameSuccessPayload>,
    ) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
      state.isfetching = false;
    },
    leaveGameSuccess: (
      state,
      action: PayloadAction<leaveGameSuccessPayload>,
    ) => {
      state.currentGame = null;
      state.isfetching = false;
    },
    makeMoveSuccess: (state, action: PayloadAction<makeMoveSuccessPayload>) => {
      state.isfetching = false;
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
  setIsFetching,
  registerSuccess,
  getPlayerInfoSuccess,
  getPlayerInfoFailed,
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
