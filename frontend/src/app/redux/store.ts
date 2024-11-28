// store.ts
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type player = {
  id: string;
  displayName: string;
  rating: number;
  email: string;
  isInGame: boolean;
};

type game = {
  gameId: string;
  white: player;
  black: player;
  spectators: player[];
};

// 定義 Redux 狀態的型別
interface WebSocketState {
  games: game[]; // 通用訊息的陣列
  playerInfo: player;
  chessboard: string[][];
}

// 定義初始狀態
const initialState: WebSocketState = {
  games: [],
  playerInfo: {
    id: "",
    displayName: "",
    rating: 0,
    email: "",
    isInGame: false,
  },
  chessboard: [], // 改成初始chessboard
};

// 建立 WebSocket Slice
const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    // addGeneralMessage: (state, action: PayloadAction<string>) => {
    //   state.generalMessages.push(action.payload);
    // },
    // addRoomMessage: (
    //   state,
    //   action: PayloadAction<{ roomId: string; message: string }>
    // ) => {
    //   const { roomId, message } = action.payload;
    //   if (!state.roomMessages[roomId]) {
    //     state.roomMessages[roomId] = [];
    //   }
    //   state.roomMessages[roomId].push(message);
    // },
  },
});

// 匯出 actions
export const { addGeneralMessage, addRoomMessage } = websocketSlice.actions;

// 配置 Redux Store
export const store = configureStore({
  reducer: {
    websocket: websocketSlice.reducer,
  },
});

// 定義 RootState 和 AppDispatch 型別，方便在專案中使用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
