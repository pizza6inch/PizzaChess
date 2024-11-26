import {WebSocket,RawData} from 'ws'

import {CreateGamePayload,JoinGamePayload} from "./type"


const messageHandler = (ws: WebSocket,data:RawData) => {
    try{
        const {type,payload} = JSON.parse(data.toString());
        switch(type){
            case 'createGame':
                const {userId,playWhite = true,timeLimit = 60 * 10}:CreateGamePayload = payload;
                console.log(userId,playWhite,timeLimit);
            break;

            case 'joinGame':
                break;
            default:
                break;


        }
    } catch (e) {
        console.log(`errorMessage: ${e}`)
        errorHandler(ws,"please send valid json format data")
    }
}

const errorHandler = (ws:WebSocket,errorMessage:string) => {

    ws.send(errorMessage);
}

export default messageHandler;