"use client";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { setWsConnected } from "@/redux/slices/webSocketSlice";
import {
  registerSuccess,
  loginSuccess,
  loginFailed,
  createGameSuccess,
  joinGameSuccess,
  spectateGameSuccess,
  startGameSuccess,
  setAllGameStatus,
  setGameDetail,
  leaveGameSuccess,
} from "@/redux/slices/webSocketSlice";

import {
  CreateGamePayload,
  JoinGamePayload,
  SpectateGamePayload,
  StartGamePayload,
  LeaveGamePayload,
  RegisterPayload,
  LoginPayload,
  MakeMovePayload,
} from "@/types/webSocket";

// 定義 Context 類型
interface WebSocketContextType {
  createGame: (payload: CreateGamePayload) => void;
  joinGame: (payload: JoinGamePayload) => void;
  spectateGame: (payload: SpectateGamePayload) => void;
  startGame: (payload: StartGamePayload) => void;
  leaveGame: (payload: LeaveGamePayload) => void;
  register: (payload: RegisterPayload) => void;
  login: (payload: LoginPayload) => void;
  makeMove: (payload: MakeMovePayload) => void;
}

// 建立 Context
const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{
  url: string;
  children: React.ReactNode;
}> = ({ url, children }) => {
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      dispatch(setWsConnected(true));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const { type, payload } = data;

      // 根據數據類型分流到 Redux
      switch (type) {
        case "REGISTER_SUCCESS":
          dispatch(registerSuccess(payload));
          break;
        case "LOGIN_SUCCESS":
          dispatch(loginSuccess(payload));
          break;
        case "LOGIN_FAILED":
          dispatch(loginFailed(payload));
          break;
        case "CREATE_GAME_SUCCESS":
          dispatch(createGameSuccess(payload));
          break;
        case "JOIN_GAME_SUCCESS":
          dispatch(joinGameSuccess(payload));
          break;
        case "SPECTATE_GAME_SUCCESS":
          dispatch(spectateGameSuccess(payload));
          break;
        case "START_GAME_SUCCESS":
          dispatch(startGameSuccess(payload));
          break;
        case "LEAVE_GAME_SUCCESS":
          dispatch(leaveGameSuccess(payload));
          break;
        case "ALL_GAME_STATUS":
          dispatch(setAllGameStatus(payload));
          break;
        case "GAME_DETAIL":
          dispatch(setGameDetail(payload));
          break;
      }
      if (type === "ERROR") {
        toast.error(`${payload.errorType}: ${payload.error}`);
      } else if (type !== "ALL_GAME_STATUS" && type !== "GAME_DETAIL") {
        toast.success(`${type}`);
      }
      console.log("WebSocket message", type, payload);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      dispatch(setWsConnected(false));
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    // 清理 WebSocket
    return () => {
      ws.current?.close();
    };
  }, [url, dispatch]);

  const sendMessage = (type: string, payload: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const request = {
        type,
        payload,
      };

      ws.current.send(JSON.stringify(request));
    } else {
      console.error("WebSocket is not open");
    }
  };

  const createGame = (payload: CreateGamePayload) => {
    sendMessage("CREATE_GAME", payload);
  };
  const joinGame = (payload: JoinGamePayload) => {
    sendMessage("JOIN_GAME", payload);
  };
  const spectateGame = (payload: SpectateGamePayload) => {
    sendMessage("SPECTATE_GAME", payload);
  };
  const startGame = (payload: StartGamePayload) => {
    sendMessage("START_GAME", payload);
  };
  const leaveGame = (payload: LeaveGamePayload) => {
    sendMessage("LEAVE_GAME", payload);
  };
  const register = (payload: RegisterPayload) => {
    sendMessage("REGISTER", payload);
  };
  const login = (payload: LoginPayload) => {
    sendMessage("LOGIN", payload);
  };
  const makeMove = (payload: MakeMovePayload) => {
    sendMessage("MAKE_MOVE", payload);
  };

  return (
    <WebSocketContext.Provider
      value={{
        createGame,
        joinGame,
        spectateGame,
        startGame,
        leaveGame,
        register,
        login,
        makeMove,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// 建立自定義 Hook 使用 Context
export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
