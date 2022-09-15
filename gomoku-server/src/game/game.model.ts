import mongoose, { Document } from "mongoose"
import {UserDocument} from "../auth/user.model";

export interface GameDocument extends Document {
    gameID?: string,
    date?: string,
    boardSize: number,
    length: number,
    userID?: UserDocument["_id"],
    moves: {id:string, player:string}[],
    winner?: "black" | "white"|"draw" | undefined
}

const gameSchema = new mongoose.Schema({
    date: String,
    boardSize: Number,
    length: Number,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    moves: [{id:String, player:String}],
    winner: String
})

export default mongoose.model<GameDocument>("game", gameSchema)