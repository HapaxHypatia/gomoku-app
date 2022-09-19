import express, { Request, Response } from 'express'
import validateSchema from '../util/validateSchema'
import GameModel from '../game/game.model'
import {deserializeUser} from "../auth/deserializeUser";
import mongoose from "mongoose";

const historyHandler = express.Router()

 async function getGameById(id: string) {
  return await GameModel.findById(id).lean()
}


//GET games by userId
historyHandler.get(
    '/games/:userId',
    async (req: Request, res: Response)=>{
    const userId = req.params.userId
    const objID = new mongoose.Types.ObjectId(userId)
    const gameHistory = await GameModel.find({ "gameUser": objID });
    return res.status(200).send(
        gameHistory.map((g) => ({
        _id: g._id,
        date:g.createdAt,
        winner: g.winner,
        boardSize: g.boardSize,
        length: g.length,
        player: g.gameUser,
        moves: g.moves
        }
        )
        )
    )
    }
)

//get single game by id
historyHandler.get('/:gameId',
    async (req: Request, res: Response) => {
    const GameId = req.params.gameId
    const objID = new mongoose.Types.ObjectId(GameId)
    const game = await getGameById(GameId)
    return res.status(200).send(game)
    }
    )

historyHandler.get('/', (req: Request, res: Response)=> {
  res.send('History')
})


export default historyHandler
