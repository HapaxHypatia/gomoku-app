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

async function getGamesByUserId(userId: string) {
  return await GameModel.find({ userId }).lean();
}

const historyHandler = express.Router()
historyHandler.use(deserializeUser)

// GET game by ID
historyHandler.get(
  '/:id',
  validateSchema(getGameByIdSchema),
  async (req: Request, res: Response) => {
    const gameId = req.params.id

    const game = await getGameById(gameId)
    console.log(game)
    if (!game) return res.sendStatus(404)
    return res.status(200).json({ ...game })
  }
)

//GET games by userId
historyHandler.get(
    '/:userId',
    async (req: Request, res: Response)=>{
    const userID = req.userId
    const gameHistory = await getGamesByUserId(userID)
    return res.status(200).send(
        gameHistory.map((g) => ({
        _id: g._id,
        date:g.date,
        winner: g.winner}
        )
        )
    )
    }
)

export default historyHandler