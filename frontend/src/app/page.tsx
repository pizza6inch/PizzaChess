"use client";
import Image from "next/image";
import { WebSocketProvider } from "./components/WebSocketProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 必須導入樣式
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function Home() {
  const notify = () => {
    toast("This is a toast notification!");
  };

  return (
    <>
      <Provider store={store}>
        <WebSocketProvider url="ws://localhost:8080">
          <button onClick={notify}>Show Toast</button>
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
        </WebSocketProvider>
      </Provider>
    </>
  );
}
