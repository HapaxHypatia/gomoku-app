import express, { Request, Response } from 'express'
import validateSchema from '../util/validateSchema'
import GameModel from '../game/game.model'
import {deserializeUser} from "../auth/deserializeUser";
import { string, object, TypeOf } from 'zod'

const params = {
  params: object({
    id: string({
      required_error: 'Game id is required',
    }),
  }),
}

const getGameByIdSchema = object({
  ...params,
})

type getGameByIdInput = TypeOf<typeof getGameByIdSchema>

async function getGameById(id: string) {
  return await GameModel.findById(id).lean()
}

const historyHandler = express.Router()

//GET games by userId
historyHandler.get(
    '/:userId',
    async (req: Request, res: Response)=>{
    const userId = req.userId
    const gameHistory = await GameModel.find({ gameUser: userId }).lean();
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

export default historyHandler