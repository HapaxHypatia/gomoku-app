import {checkLine} from "./gameFunctions";
import express, {Request, Response} from "express";
import {deserializeUser} from "../auth/deserializeUser";
import validateSchema from "../util/validateSchema";
import {createGameSchema, deleteGameSchema, updateGameSchema} from "./game.schema";
import GameModel, {GameDocument} from "./game.model";
import mongoose, {DocumentDefinition} from "mongoose";

const gameHandler = express.Router()

async function createGame(
  input: DocumentDefinition<GameDocument>
) {
  return GameModel.create(input)
}

async function deleteGame(id: string, userId: string) {
  return GameModel.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
    userId: new mongoose.Types.ObjectId(userId),
  })
}async function deleteUserGames(userId: string) {
  return GameModel.deleteMany({
    userId: new mongoose.Types.ObjectId(userId),
  })
}

//Create new game
gameHandler.post('/',
  validateSchema(createGameSchema),
  async (req: Request, res: Response) => {
  const userId = req.userId
  const gameDetails = req.body
  const newGame = await createGame({ ...gameDetails, userId })
  return res.status(200).send(newGame)
})

//Update moves (require gameId & userId)
gameHandler.put('/:id/',
  // validateSchema(updateGameSchema),
  async (req: Request, res: Response) => {
    const userId = req.userId
    const input = req.body
    const gameId = req.params.id
    const newGame = await GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(gameId),
            userId: new mongoose.Types.ObjectId(userId),
        },
        {
            $addToSet:{"moves": input}},
        {
            new:true
        } // new option to true to return the document after update was applied.
    )
    if (!newGame) return res.sendStatus(404)
    return res.status(200).json(newGame)
})

//clear moves array
gameHandler.put('/:id/clear',
      async (req: Request, res: Response) => {
    const userId = req.userId
    const gameId = req.params.id

    const newGame = await GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(gameId),
            userId: new mongoose.Types.ObjectId(userId),
            },
    {
            $set: {"moves":[]}
            },
    {
            new:true
            }
    )
    if (!newGame) return res.sendStatus(404)
    return res.status(200).json(newGame)
    }

)

//Delete game by ID
gameHandler.delete(
  '/:id',
  validateSchema(deleteGameSchema),
  async (req: Request, res: Response) => {
    //delete game entry
    const GameId = req.params.id
    const userId = req.userId
    await deleteGame(GameId, userId)
    return res.sendStatus(200)
  }
)

//Delete games by userId
gameHandler.delete(
  '/:userId',
  // validateSchema(deleteGameSchema),
  async (req: Request, res: Response) => {
    //delete game entry
    const userId = req.userId
    await deleteUserGames(userId)
    return res.sendStatus(200)
  }
)


export default gameHandler