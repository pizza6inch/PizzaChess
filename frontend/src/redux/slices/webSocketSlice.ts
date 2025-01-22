import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
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
  GameInfo,
  GameDetail,
  Player,
} from "@/types/webSocket";

// 定義 Redux 狀態的型別
type InitialState = {
  games: GameInfo[] | null; // 通用訊息的陣列
  playerInfo: Player | null;
  gameOwnerToken: string | null;
  currentGame: GameDetail | null;
  wsConnected: boolean;
};

// 定義初始狀態
const initialState: InitialState = {
  games: null,
  gameOwnerToken: null,
  playerInfo: null,
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
      const { playerToken, playerInfo, currentGame, allGameStatus } =
        action.payload;
      sessionStorage.setItem("playerToken", playerToken);
      window.location.reload(); // 重新整理頁面
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      const { playerInfo, currentGame, allGameStatus } = action.payload;
      state.playerInfo = playerInfo;
      state.currentGame = currentGame;
      state.games = allGameStatus;
    },
    loginFailed: (state, action: PayloadAction<{}>) => {
      sessionStorage.removeItem("playerToken");
      window.location.reload(); // 重新整理頁面
    },
    createGameSuccess: (
      state,
      action: PayloadAction<CreateGameSuccessPayload>,
    ) => {
      const { gameDetail, gameOwnerToken } = action.payload;

      window.location.href = `/game/${gameDetail.gameId}`; // 跳轉到遊戲頁面
    },
    joinGameSuccess: (state, action: PayloadAction<JoinGameSuccessPayload>) => {
      const { gameDetail } = action.payload;

      window.location.href = `/game/${gameDetail.gameId}`; // 跳轉到遊戲頁面
    },
    spectateGameSuccess: (
      state,
      action: PayloadAction<SpectateGameSuccessPayload>,
    ) => {
      const { gameDetail } = action.payload;
      state.currentGame = gameDetail;
      window.location.href = `/game/${gameDetail.gameId}`; // 跳轉到遊戲頁面
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
      action: PayloadAction<LeaveGameSuccessPayload>,
    ) => {
      window.location.href = "/room";
    },
    makeMoveSuccess: (
      state,
      action: PayloadAction<MakeMoveSuccessPayload>,
    ) => {},
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
  loginSuccess,
  loginFailed,
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
