import {WebSocket,RawData} from 'ws'

import {register,createGame,joinGame} from "./controllers/controller"


export const messageHandler = (ws: WebSocket,data:RawData) => {
    try{
        const {type,payload} = JSON.parse(data.toString());
        switch(type){

            case 'register':
                register(ws,payload);
                break;
            case 'createGame':
                createGame(ws,payload);
            break;
            case 'joinGame':
                joinGame(ws,payload);
                break;
            default:
                break;


        }
    } catch (e) {
        console.log(`errorMessage: ${e}`)
        errorHandler(ws,e,`please check the message format`);
    }
}

export const errorHandler = (ws:WebSocket,e:any,errorMessage:string) => {

    const error = `errorMessage: ${e instanceof Error ? e.message : e.toString()}`;

    const response = {
        type:'error',
        payload:{errorMessage,error}
    }

    ws.send(JSON.stringify(response));
}

export const broadcast = (WebSockets:WebSocket[],data:any) => {
    const response = {
        type:'broadcast',
        payload:data
    }

    for(const client of WebSockets){
        client.send(JSON.stringify(response));
    }
}

// export function {messageHandler,errorHandler};