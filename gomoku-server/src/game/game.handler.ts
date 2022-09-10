import express, { Request, Response } from 'express'

import validateSchema from '../auth/validateSchema'

import { getGameByIdSchema } from './game.schema'

import { getAllGames, getGameById } from './game.service'

const gameHandler = express.Router()

// Get ALL games
gameHandler.get('/', async (req: Request, res: Response) => {
  try {
    const result = await getAllGames()
    return res.status(200).send(
      result.map((g: { _id: any }) => ({
        _id: g._id,
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
    if (!game) return res.sendStatus(404)
    return res.status(200).json({ ...game })
  }
)

export default gameHandler