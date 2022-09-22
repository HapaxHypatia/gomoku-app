import express, { Request, Response } from 'express'
import validateSchema from '../util/validateSchema'
import GameModel from '../game/game.model'
import {deserializeUser} from "../auth/deserializeUser";
import mongoose from "mongoose";

const historyHandler = express.Router()
//To switch to using deserialize:
// - uncomment middleware
// - change authMethod to "deserialize"

// gameHandler.use(deserializeUser)
const authMethod = "local storage"

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
historyHandler.post('/usergames',
    async (req: Request, res: Response)=>{
    const userId = getUser(req)
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
    const game = await GameModel.findById(GameId).lean()
    return res.status(200).send(game)
    }
    )

//Delete games by userId
historyHandler.delete(
  '/deleteHistory',
  // validateSchema(deleteGameSchema),
  async (req: Request, res: Response) => {
    //delete game entry
    const userId = getUser(req)
    const objID = new mongoose.Types.ObjectId(userId)
    await GameModel.deleteMany({ 'gameUser': objID })
    return res.sendStatus(200)
  }
)

export default historyHandler
