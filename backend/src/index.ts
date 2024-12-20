import { WebSocketServer } from 'ws'
import { messageHandler } from './handler'
import { handleDisconnect } from './controllers/controller'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', function connection(ws) {
  ws.on('message', function (data) {
    messageHandler(ws, data)
  })

  ws.on('close', function () {
    handleDisconnect(ws)
  })
})

console.log('Hello, TypeScript with Nodemon!')
