import {object, string, TypeOf} from "zod";
import {createGameSchema} from "../game/game.validation";


//GET games by userId
const userHistoryParams = {
  params: object({
    userId: string({
      required_error: 'User id is required',
    }),
  }),
}
export const userHistorySchema = object(userHistoryParams)

export type UserHistoryInput = TypeOf<typeof userHistorySchema>


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


//Delete games by userId
const deleteUserHistoryParams = {
  params: object({
    userId: string({
      required_error: 'User id is required',
    }),
  }),

}
export const deleteUserHistorySchema = object(deleteUserHistoryParams)

export type DeleteUserHistoryInput = TypeOf<typeof deleteUserHistorySchema>


//Delete game by ID
const deleteGameParams = {
  params: object({
    userId: string({
      required_error: 'User id is required',
    }),
    gameId: string({
      required_error: 'GameId is required',
    }),
  }),

}
export const deleteGameSchema = object(deleteGameParams)

export type DeleteGameInput = TypeOf<typeof deleteGameSchema>
