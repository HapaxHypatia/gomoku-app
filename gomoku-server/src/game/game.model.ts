import mongoose, { Document } from "mongoose"

export interface GameDocument extends Document {
    gameID?: string,
    date?: string,
    boardSize: number,
    length: number,
    userID?: number,
    moves: {id:string, player:string}[],
    winner?: "black" | "white"|"draw" | undefined
}

const gameSchema = new mongoose.Schema({
    gameID: String,
    date: String,
    boardSize: Number,
    length: Number,
    userID: Number,
    moves: [{id:String, player:String}],
    winner: String
})

export default mongoose.model<GameDocument>("game", gameSchema)