"use client";

import { WebSocketProvider } from "./WebSocketProvider";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <WebSocketProvider
          url={process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080"}
        >
          {children}
        </WebSocketProvider>
      </Provider>
    </>
  );
}
