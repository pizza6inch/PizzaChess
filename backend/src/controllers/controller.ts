import {registerPayload,CreateGamePayload,JoinGamePayload,leaveGamePayload,spectateGamePayload,startGamePayload,makeMovePayload} from "../type"
import { broadcast, errorHandler } from "../handler";

const jwt = require('jsonwebtoken');

import {WebSocket,RawData} from 'ws'

import {Game} from "../Game"
import {User} from "../User"

const games:Game[] = []
const users = new Map<string, User>(); // key: playerToken, value: User
const WebSockets:WebSocket[] = [];
let userCount = 0;


const register = (ws:WebSocket,payload:registerPayload) => {

    try{
        const {displayName,email,rating,password} = payload;


        if(WebSockets.includes(ws)){
            throw new Error('user already registered');
        }

        const userId = (userCount + 1).toString();
        userCount += 1;
        const user = new User(userId,displayName,email,rating);

        const playerToken = generateToken(userId,password);

        users.set(playerToken,user);
        WebSockets.push(ws);

        const response = {
            type:'register',
            payload:{
                playerToken,
            }
        }

        ws.send(JSON.stringify(response));
        console.log(JSON.stringify(response));
    } catch (e) {
        console.log(`errorMessage: register error ${e}`)
        errorHandler(ws,e,`register error`);
    }
}

const createGame = (ws:WebSocket,payload:CreateGamePayload) => {

    try{
        const {playerToken,playWhite,timeLimit = 60 * 10} = payload;
        const user = users.get(playerToken);

        if(!user){
            throw new Error('invalid playerToken');
        }

        // check if the user is already in a game
        for(const game of games){
            if(game.isPlayerInGame(user)){
                throw new Error('user already in a game');
            }
        }

        const gameId = games.length.toString();
        const game = new Game(gameId,timeLimit);
        game.addPlayer(user,playWhite ? 'white' : 'black');
        games.push(game);

        const gameOwnerToken = generateToken(game.gameId,user.id);
        game.setGameOwnerToken(gameOwnerToken);
        const response = {
            type:'createGame',
            payload:{
                gameId,
                gameOwnerToken
            }
        }

        ws.send(JSON.stringify(response));

        broadcast(WebSockets,{ games: games.map(game => game.getGameInfo()) });

        console.log(JSON.stringify(response));
        
    } catch (e) {
        console.log(`errorMessage: createGameError ${e}`)
        errorHandler(ws,e,`Create Game error`);
    }
}

const joinGame = (ws:WebSocket,payload:JoinGamePayload) => {
    try{
        const {playerToken,gameId} = payload;
        const user = users.get(playerToken);

        if(!user){
            throw new Error('invalid playerToken');
        }

        // check if the user is already in a game
        for(const game of games){
            if(game.isPlayerInGame(user)){
                throw new Error('user already in a game');
            }
        }


        const game = games.find(game => game.gameId === gameId);

        if(!game){
            throw new Error('game not found');
        }

        if(game.white && game.black){
            throw new Error('game is full');
        }

        if(game.white){
            game.addPlayer(user,'black');
        }

        if(game.black){
            game.addPlayer(user,'white');
        }

        const response = {
            type:'joinGame',
            payload:{
                gameId
            }
        }


        console.log(JSON.stringify(response));
        ws.send(JSON.stringify(response));
        broadcast(WebSockets,{ games: games.map(game => game.getGameInfo()) });
    } catch (e) {
        console.log(`errorMessage: joinGameError ${e}`)
        errorHandler(ws,e,`Join Game error`);
    }
}

const leaveGame = (ws:WebSocket,payload:leaveGamePayload) => {
    
        try{
            const {playerToken,gameId} = payload;
            const user = users.get(playerToken);
    
            if(!user){
                throw new Error('invalid playerToken');
            }
    
            const game = games.find(game => game.gameId === gameId);
    
            if(!game){
                throw new Error('game not found');
            }
    
            if(!game.isPlayerInGame(user)){
                throw new Error('user not in game');
            }
    
            game.leaveGame(user);
    
            const response = {
                type:'leaveGame',
                payload:{
                    gameId
                }
            }
    
            console.log(JSON.stringify(response));
            ws.send(JSON.stringify(response));
            broadcast(WebSockets,{ games: games.map(game => game.getGameInfo()) });
        } catch (e) {
            console.log(`errorMessage: leaveGameError ${e}`)
            errorHandler(ws,e,`Leave Game error`);
        }
}

const spectateGame = (ws:WebSocket,payload:JoinGamePayload) => {
    try{
        const {playerToken,gameId} = payload;
        const user = users.get(playerToken);

        if(!user){
            throw new Error('invalid playerToken');
        }

        // check if the user is already in a game
        for(const game of games){
            if(game.isPlayerInGame(user)){
                throw new Error('user already in a game');
            }
        }

        const game = games.find(game => game.gameId === gameId);

        if(!game){
            throw new Error('game not found');
        }

        game.addPlayer(user,"spectator");

        const response = {
            type:'spectateGame',
            payload:{
                gameId
            }
        }

        console.log(JSON.stringify(response));
        ws.send(JSON.stringify(response));
        broadcast(WebSockets,{ games: games.map(game => game.getGameInfo()) });
    } catch (e) {
        console.log(`errorMessage: spectateGameError ${e}`)
        errorHandler(ws,e,`Spectate Game error`);
    }
}

const startGame = (ws:WebSocket,payload:JoinGamePayload) => {}

const makeMove = (ws:WebSocket,payload:JoinGamePayload) => {}

const handleDisconnect = (ws:WebSocket) => {}


const generateToken = (id:string,dependency:string) => {
    const payload = {
        id,
        dependency
    }

    const secretKey = 'secretKey';
    const token = jwt.sign(payload,secretKey,{expiresIn:'1h'});

    return token;
}


export {register ,createGame,joinGame,leaveGame,spectateGame,startGame,makeMove,handleDisconnect}