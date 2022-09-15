import express, { Request, Response } from 'express'

import validateSchema from '../auth/validateSchema'

import { getGameByIdSchema } from './game.schema'

import GameModel from './game.model'

async function getAllGames() {
  return await GameModel.find().lean()
}

async function getGameById(id: string) {
  return await GameModel.findById(id).lean()
}

export async function getGamesByUserId(userId: string) {
  return await GameModel.find({ userId }).lean();
}

const gameHandler = express.Router()

// Get ALL games
gameHandler.get('/', async (req: Request, res: Response) => {
  try {
    const result = await getAllGames()
    return res.status(200).send(
      result.map((g) => ({
        _id: g._id,
        date:g.date,
        winner: g.winner
      //add other properties here
      }))
    )
  } catch (err) {
    return res.status(500).send(err)
  }
})

// GET game by ID
gameHandler.get(
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

  // const gameHistory = await getGamesByUserId(userID)
//how to access current userID here?

export default gameHandler