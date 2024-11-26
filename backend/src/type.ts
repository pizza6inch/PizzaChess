type CreateGamePayload =  {
    userId:string,
    playWhite:boolean,
    timeLimit:number
}

type JoinGamePayload = {
    userId:string,
    gameId:string,
}





export { CreateGamePayload, JoinGamePayload }