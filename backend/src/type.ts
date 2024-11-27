import { User } from "./User"



type registerPayload = {
    displayName:string,
    email:string,
    rating:number
    password:string
}

type CreateGamePayload =  {
    token:string,
    playWhite:boolean,
    timeLimit:number
}

type JoinGamePayload = {
    token:string,
    gameId:string,
}





export {registerPayload,LoginPayload, CreateGamePayload, JoinGamePayload }