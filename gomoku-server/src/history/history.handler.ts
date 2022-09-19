import express, { Request, Response } from 'express'
import validateSchema from '../util/validateSchema'
import GameModel from '../game/game.model'
import {deserializeUser} from "../auth/deserializeUser";
import { string, object, TypeOf } from 'zod'

const historyHandler = express.Router()

//GET games by userId
historyHandler.get(
    '/:userId',
    async (req: Request, res: Response)=>{
    const userId = req.userId
    const gameHistory = await GameModel.find({ "gameUser": userId }).lean();
        console.log(gameHistory)
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
    const GameId = req.params.id
    console.log("GAME ID: "+GameId)
    const game = await GameModel.findOne({_id:GameId}).lean()
    return res.status(200).send(game)
    }
    )

historyHandler.get('/', (req: Request, res: Response)=> {
  res.send('History')
})


export default historyHandler
