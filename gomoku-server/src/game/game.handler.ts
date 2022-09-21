import {Game} from "./gameFunctions";
import express, {Request, Response} from "express";
import {deserializeUser} from "../auth/deserializeUser";
import validateSchema from "../util/validateSchema";
import {createGameSchema, deleteGameSchema, updateGameSchema} from "./game.schema";
import GameModel, {GameDocument} from "./game.model";
import mongoose, {DocumentDefinition} from "mongoose";

const gameHandler = express.Router()

//To switch to using deserialize:
// - uncomment middleware
// - change authMethod to "deserialize"

// gameHandler.use(deserializeUser)
const authMethod = "local storage"

function getUser(req:Request){
    let userId
    if(authMethod==="deserialize"){
        userId = req.userId}
    else{
         userId = req.headers.cookie
        }
    return userId
    }


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
}

//Create new game
gameHandler.post('/',
  validateSchema(createGameSchema),
  async (req: Request, res: Response) => {
  const userId = getUser(req)
  const gameDetails = req.body
  const newGame = await createGame({ ...gameDetails, gameUser:new mongoose.Types.ObjectId(userId) })
  return res.status(200).send(newGame)
})

//Update moves (require gameId)
gameHandler.put('/:id/',
  validateSchema(updateGameSchema),
  async (req: Request, res: Response) => {
    const square = req.body.square
    const player = req.body.player
    const gameId = req.params.id
    const newGame = await GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(gameId)
        },
        {
            $addToSet:{"moves": {"square":square, "player":player}}},
        {
            new:true
        }
    )
    if (!newGame) return res.sendStatus(404)
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(newGame)
})

gameHandler.post('/check',
    // validateSchema(),
    async (req: Request, res: Response) => {
        const gameId = req.body.gameId
        const squareId = req.body.squareId
        const squares = req.body.squares
        const player = req.body.player
        const result = Game(gameId, squareId, squares, player)
        return res.status(200).json(result)
    }
    )

//clear moves array
gameHandler.put('/clear/:id',
      async (req: Request, res: Response) => {
    const gameId = req.params.id
    const newGame = await GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(gameId)
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
    const userId = getUser(req)
    await deleteGame(GameId, userId)
    return res.sendStatus(200)
  }
)

export default gameHandler