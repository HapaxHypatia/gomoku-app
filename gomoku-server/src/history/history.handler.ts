import express, { Request, Response } from 'express'
import validateSchema from '../util/validateSchema'
import GameModel from '../game/game.model'
import {deserializeUser} from "../auth/deserializeUser";
import mongoose from "mongoose";
import gameHandler from "../game/game.handler";

const historyHandler = express.Router()
historyHandler.use(deserializeUser)

//GET games by userId
historyHandler.get('/usergames',
    async (req: Request, res: Response)=>{
    const userId = req.userId
    const objID = new mongoose.Types.ObjectId(userId)
    const gameHistory = await GameModel.find({ "gameUser": objID });
    return res.status(200).send(
        gameHistory.map((g) => ({
        _id: g._id,
        date:g.createdAt,
        winner: g.winner,
        boardSize: g.boardSize,
        lineLength: g.lineLength,
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
    const game = await GameModel.findById(GameId).lean()
    return res.status(200).send(game)
    }
    )

//Delete games by userId
historyHandler.delete(
  '/user',
  // validateSchema(deleteGameSchema),
  async (req: Request, res: Response) => {
    //delete game entry
    const userId = req.userId
      console.log(userId)
    const objID = new mongoose.Types.ObjectId(userId)
    await GameModel.deleteMany({ 'gameUser': objID })
    return res.sendStatus(200)
  }
)

historyHandler.get('/', (req: Request, res: Response)=> {
  res.send('History')
})

export default historyHandler
