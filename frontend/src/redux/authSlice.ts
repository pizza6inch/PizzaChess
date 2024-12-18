import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {} from './types'

// 定義 Redux 狀態的型別
type InitialState = {
  user: {
    id: string
    displayName: string
    rating: number
    email: string
    isInGame: boolean
  } | null
  // games: GameInfo[]; // 通用訊息的陣列
  // playerInfo: player;
  // playerToken: string;
  // gameOwnerToken: string;
  // currentGame: GameDetail | null;
}

// 定義初始狀態
const initialState: InitialState = {
  user: null, // 用戶信息
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
  name: 'Auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem('actkn')
      } else {
        if (action.payload.token) {
          localStorage.setItem('actkn', action.payload.token)
        }
      }
      state.user = action.payload
    },
    // registerSuccess: (state, action: PayloadAction<RegisterSuccessPayload>) => {
    //   const { playerToken, playerInfo } = action.payload;
    //   state.playerToken = playerToken;
    //   state.playerInfo = playerInfo;
    // },
  },
})

// 匯出 actions
export const {
  setUser,
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
