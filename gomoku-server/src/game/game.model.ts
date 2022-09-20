import mongoose, {Document, Schema} from "mongoose"
import {UserDocument} from "../auth/user.model";

export interface GameDocument extends Document {
    boardSize: number,
    length: number,
    gameUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    moves: {square:string, player:string}[],
    winner: "black" | "white"|"draw" | "none", 
    createdAt?: Date
}

const gameSchema = new mongoose.Schema({
    boardSize: Number,
    length: Number,
    gameUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    moves: [{square:String, player:String}],
    winner: String
},{ timestamps: true })

export default mongoose.model<GameDocument>("game", gameSchema)

