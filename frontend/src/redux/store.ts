// store.ts
import { configureStore } from "@reduxjs/toolkit";
import webSocketSlice from "./webSocketSlice";

// 配置 Redux Store
export const store = configureStore({
  reducer: {
    websocket: webSocketSlice.reducer,
  },
});

// 定義 RootState 和 AppDispatch 型別，方便在專案中使用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
