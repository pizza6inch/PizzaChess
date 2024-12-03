"use client";
import Image from "next/image";
import { WebSocketProvider } from "../components/WebSocketProvider";
import Test from "../components/Test";
import "@/app/global.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 必須導入樣式
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <Provider store={store}>
        <WebSocketProvider url="ws://localhost:8080">
          <Test />
        </WebSocketProvider>
      </Provider>
    </>
  );
}
