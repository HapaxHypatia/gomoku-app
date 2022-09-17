import {User} from "./user";

export type GameType = {
    _id: string
    date: string,
    boardSize: number,
    length: number,
    user: User,
    moves: {id:string, player:string}[],
    winner: "black" | "white" | "draw" | undefined
}