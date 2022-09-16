import {User} from "./user";

export type GameType = {
    gameID?: string,
    date?: string,
    boardSize: number,
    length: number,
    user?: User,
    moves: {id:string, player:string}[],
    squares: {id:string, status:string}[],
    currentPlayer: "black" | "white",
    winner?: "black" | "white"|"draw" | undefined
}