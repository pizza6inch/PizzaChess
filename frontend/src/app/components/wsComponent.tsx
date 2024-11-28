"use client";
import React, { useState, useEffect } from "react";

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]); // 儲存接收到的訊息
  const [input, setInput] = useState(""); // 使用者輸入的訊息
  const [socket, setSocket] = useState<WebSocket | null>(null); // WebSocket 實例

  useEffect(() => {
    // 建立 WebSocket 連線
    const ws = new WebSocket("ws://localhost:8080");

    // WebSocket 開啟連線事件
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // WebSocket 接收訊息事件
    ws.onmessage = (event) => {
      console.log("Message received:", event.data);
      setMessages(event.data); // 儲存訊息
    };

    // WebSocket 錯誤處理
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // WebSocket 關閉連線事件
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws); // 保存 WebSocket 實例供後續使用

    // 清除 WebSocket 當組件卸載時
    return () => {
      ws.close();
    };
  }, []);

  // 發送訊息的函數
  const sendMessage = () => {
    if (socket && input) {
      socket.send(input); // 傳送訊息
      console.log("Message sent:", input);
      setInput(""); // 清空輸入框
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages:</h2>
        <ul>{messages && <li>{messages}</li>}</ul>
      </div>
    </div>
  );
};

export default WebSocketComponent;
