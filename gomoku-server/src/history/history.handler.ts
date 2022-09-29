import express, { Request, Response } from 'express'
import validateSchema from '../util/validateSchema'
import GameModel from '../game/game.model'
import {deserializeUser} from "../auth/deserializeUser";
import mongoose from "mongoose";
import {deleteGameSchema, getGameSchema} from "./history.validation";

const historyHandler = express.Router()
//To switch to using deserialize:
// - uncomment middleware
// - change authMethod to "deserialize"

historyHandler.use(deserializeUser)
const authMethod = "deserialize"

function getUser(req:Request){
    let userId
    // @ts-ignore
    if(authMethod==="deserialize"){
        userId = req.userId}
    else{
         userId = req.body.userId
        }
    return userId
    }

//GET games by userId
historyHandler.get('/usergames',
    async (req: Request, res: Response)=>{
    // const userId = req.params.userId
    const userId = req.userId
    const objID = new mongoose.Types.ObjectId(userId)
    const gameHistory = await GameModel.find({ "gameUser": objID, 'moves.1':{$exists:true}});
    return res.status(200).send(
        gameHistory.map((g) => ({
        _id: g._id,
        date:g.createdAt,
        winner: g.winner,
        boardSize: g.boardSize,
        lineLength: g.lineLength,
        player: g.gameUser,
        moves: g.moves
        })))})

//get single game by id
historyHandler.get('/:gameId',
    validateSchema(getGameSchema),
    async (req: Request, res: Response) => {
    const GameId = req.params.gameId
    const game = await GameModel.findById(GameId).lean()
    return res.status(200).send(game)
    }
    )

//Delete games by userId
historyHandler.delete(
  '/deleteHistory/:userId',
  async (req: Request, res: Response) => {
    //delete game entry
    const userId = req.params.userId
    const objID = new mongoose.Types.ObjectId(userId)
    await GameModel.deleteMany({ 'gameUser': objID })
    return res.sendStatus(200)
  }
)

//Delete unfinished games
historyHandler.delete(
  '/deleteUnfinished/',
  // validateSchema(deleteGameSchema),
  async (req: Request, res: Response) => {
    //delete game entries
    await GameModel.deleteMany({'winner': 'none'})
    return res.sendStatus(200)
  }
)

async function deleteGame(id: string, userId: string) {
  return GameModel.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
    userId: new mongoose.Types.ObjectId(userId),
  })
}

//Delete game by ID
historyHandler.delete(
  '/deleteGame/:gameId/:userId',
  validateSchema(deleteGameSchema),
  async (req: Request, res: Response) => {
    //delete game entry
    const GameId = req.params.gameId
    const userId = req.params.userId
    await deleteGame(GameId, userId)
    return res.sendStatus(200)
  }
)

export default historyHandler
