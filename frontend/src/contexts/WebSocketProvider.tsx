"use client";
import React, { createContext, useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { setWsConnected } from "@/redux/slices/webSocketSlice";
import {
  registerSuccess,
  getPlayerInfoSuccess,
  getPlayerInfoFailed,
  createGameSuccess,
  joinGameSuccess,
  spectateGameSuccess,
  startGameSuccess,
  setAllGameStatus,
  setGameDetail,
  leaveGameSuccess,
} from "@/redux/slices/webSocketSlice";

import {
  createGamePayload,
  joinGamePayload,
  spectateGamePayload,
  startGamePayload,
  leaveGamePayload,
  registerPayload,
  getPlayerInfoPayload,
  makeMovePayload,
} from "@/types/webSocket";

// 定義 Context 類型
interface WebSocketContextType {
  createGame: (payload: createGamePayload) => void;
  joinGame: (payload: joinGamePayload) => void;
  spectateGame: (payload: spectateGamePayload) => void;
  startGame: (payload: startGamePayload) => void;
  leaveGame: (payload: leaveGamePayload) => void;
  register: (payload: registerPayload) => void;
  getPlayerInfo: (payload: getPlayerInfoPayload) => void;
  getAllGamesStatus: () => void;
  makeMove: (payload: makeMovePayload) => void;
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
        case "registerSuccess":
          dispatch(registerSuccess(payload));
          break;
        case "getPlayerInfoSuccess":
          dispatch(getPlayerInfoSuccess(payload));
          break;
        case "getPlayerInfoFailed": // 過期或是錯誤playerToken
          dispatch(getPlayerInfoFailed(payload));
          break;
        case "createGameSuccess":
          dispatch(createGameSuccess(payload));
          break;
        case "joinGameSuccess":
          dispatch(joinGameSuccess(payload));
          break;
        case "spectateGameSuccess":
          dispatch(spectateGameSuccess(payload));
          break;
        case "startGameSuccess":
          dispatch(startGameSuccess(payload));
          break;
        case "leaveGameSuccess":
          dispatch(leaveGameSuccess(payload));
          break;
        case "allGameStatus":
          dispatch(setAllGameStatus(payload));
          break;
        case "gameDetail":
          dispatch(setGameDetail(payload));
          break;
      }
      if (type === "error") {
        toast.error(`${payload.errorType}: ${payload.error}`);
      } else if (type !== "allGameStatus" && type !== "gameDetail") {
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

  const createGame = (payload: createGamePayload) => {
    sendMessage("createGame", payload);
  };
  const joinGame = (payload: joinGamePayload) => {
    sendMessage("joinGame", payload);
  };
  const spectateGame = (payload: spectateGamePayload) => {
    sendMessage("spectateGame", payload);
  };
  const startGame = (payload: startGamePayload) => {
    sendMessage("startGame", payload);
  };
  const leaveGame = (payload: leaveGamePayload) => {
    sendMessage("leaveGame", payload);
  };
  const register = (payload: registerPayload) => {
    sendMessage("register", payload);
  };

  const getPlayerInfo = (payload: getPlayerInfoPayload) => {
    sendMessage("getPlayerInfo", payload);
  };
  const getAllGamesStatus = () => {
    sendMessage("getAllGamesStatus", {});
  };

  const makeMove = (payload: makeMovePayload) => {
    sendMessage("makeMove", payload);
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
        getPlayerInfo,
        getAllGamesStatus,
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
