import mongoose, {Document, Schema} from "mongoose"
import {UserDocument} from "../auth/user.model";

export interface GameDocument extends Document {
    boardSize: number,
    lineLength: number,
    gameUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    moves: {square:string, player:string}[],
    winner: "black" | "white"|"draw" | "none", 
    createdAt?: Date
}

const gameSchema = new mongoose.Schema({
    boardSize: Number,
    lineLength: Number,
    gameUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    moves: [new Schema({
        move: {type: Schema.Types.ObjectId, ref: 'Move'},
        square: String,
        player: String},
        {_id: false})],
    winner: String
},{ timestamps: true })

export default mongoose.model<GameDocument>("game", gameSchema)

