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
  return GameModel.findById(id).lean();
}

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
    validateSchema(getGameByIdSchema),
    async (req: Request, res: Response) => {
    const GameId = req.params.id
    const game = await getGameById(GameId)
    return res.status(200).send(game)
    }
    )

historyHandler.get('/', (req: Request, res: Response)=> {
  res.send('History')
})


export default historyHandler