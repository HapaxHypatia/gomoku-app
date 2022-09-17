import {checkDraw, createGame, deleteGame} from "./gameFunctions";
import {checkLine} from "./gameFunctions";
import express, {Request, Response} from "express";
import {deserializeUser} from "../auth/deserializeUser";
import validateSchema from "../util/validateSchema";
import {createGameSchema, deleteGameSchema, updateGameSchema} from "./game.schema";
import GameModel from "./game.model";

const gameHandler = express.Router()

gameHandler.post('/',
  validateSchema(createGameSchema),
  async (req: Request, res: Response) => {
  //create game entry
  const userId = req.userId
  const gameDetails = req.body
  const newGame = await createGame({ ...gameDetails, userId })
  return res.status(200).send(newGame)
})

gameHandler.put('/:id',
  validateSchema(updateGameSchema),
  async (req: Request, res: Response) => {
  // TODO update game entry
})

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

gameHandler.get('/game/:id',
    async (req: Request, res: Response) => {
    const GameId = req.params.id
    const game = await GameModel.findById(GameId).lean()
    return res.status(200).send(game)
    }
    )

// gameHandler.post(
//   '/check',
//   validateSchema(),
//   async (req:Request, res:Response)=> {
//
//   //  TODO check for win
//take in gameState and squareID
//return win/draw/continue
//   }
// )

export default gameHandler