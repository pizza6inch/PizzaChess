import { WebSocketServer } from 'ws';
import {messageHandler} from "./handler"
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.send("connected");

  ws.on('message', function (data) {

    messageHandler(ws,data)

  })

  ws.on('close', function () {

    handleDisconnect(ws);

  });

});

console.log("Hello, TypeScript with Nodemon!");
