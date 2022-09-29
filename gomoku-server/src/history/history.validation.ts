import {object, string, TypeOf} from "zod";
import {createGameSchema} from "../game/game.validation";



//get single game by id
const getGameParams = {
  params: object({
    gameId: string({
      required_error: 'Game id is required',
    }),
  }),

}
export const getGameSchema = object(getGameParams)

export type GetGameInput = TypeOf<typeof getGameSchema>


//Delete game by ID
const deleteGameParams = {
  params: object({
    gameId: string({
      required_error: 'GameId is required',
    }),
  }),

}
export const deleteGameSchema = object(deleteGameParams)

export type DeleteGameInput = TypeOf<typeof deleteGameSchema>
