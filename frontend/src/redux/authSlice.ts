import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {} from './types'

// 定義 Redux 狀態的型別
type InitialState = {
  // games: GameInfo[]; // 通用訊息的陣列
  // playerInfo: player;
  // playerToken: string;
  // gameOwnerToken: string;
  // currentGame: GameDetail | null;
}

// 定義初始狀態
const initialState: InitialState = {
  // games: [],
  // playerToken: "",
  // gameOwnerToken: "",
  // playerInfo: {
  //   id: "",
  //   displayName: "",
  //   rating: 0,
  //   email: "",
  //   isInGame: false,
  // },
  // currentGame: null,
}

// 建立 WebSocket Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // registerSuccess: (state, action: PayloadAction<RegisterSuccessPayload>) => {
    //   const { playerToken, playerInfo } = action.payload;
    //   state.playerToken = playerToken;
    //   state.playerInfo = playerInfo;
    // },
  },
})

// 匯出 actions
export const {
  // registerSuccess,
  // createGameSuccess,
  // joinGameSuccess,
  // spectateGameSuccess,
  // setAllGameStatus,
  // setGameDetail,
  // startGameSuccess,
  // leaveGameSuccess,
  // makeMoveSuccess,
} = authSlice.actions

export default authSlice
