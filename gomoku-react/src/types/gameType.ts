import {User} from "./user";

export type GameType = {
    _id: string
    createdAt: string,
    boardSize: number,
    length: number,
    user: User,
    moves: {square:string, player:string}[],
    winner: "black" | "white" | "draw" | undefined
}