import { object, string, number, array, TypeOf } from 'zod'
import mongoose from "mongoose";

const createParams = {
  //input to create a game
body: object({
  game: object({
    boardSize: number({
      required_error: 'BoardSize is required',
    }),
    lineLength: number({
      required_error: 'LineLength is required',
    }),
  })})}

const updateMovesParams = {
  //input to update moves array
  body: object({
    gameId: string({
      required_error: 'Game id is required',
    }),
    square: string({
      required_error: 'Square id is required',
    }),
    player: string({
      required_error: 'Current player is required',
    }),
  }),
}

const checkParams = {
  //input to check game status
body: object({
    gameId: string({
      required_error: 'Game id is required',
    }),
    squareId: string({
      required_error: 'Square id is required',
    }),
    player: string({
      required_error: 'Current player is required',
    }),
    squares: array(object({
      id: string({required_error: 'Square Id is required for each square'}),
      status: string({required_error: 'Status is required for each square'}),
    }))
     })
}

const clearMovesParams = {
//  input to clear moves array
    body: object({
      gameId: string({
        required_error: 'Game id is required',
    }),
    })
}


export const createGameSchema = object({
  ...createParams,
})
export const updateMovesSchema = object({
  ...updateMovesParams,
})
export const checkResultSchema = object({
  ...checkParams,
})
export const clearMovesSchema = object({
  ...clearMovesParams,
})



export type CreateGameInput = TypeOf<typeof createGameSchema>
export type UpdateMovesInput = TypeOf<typeof updateMovesSchema>
export type CheckGameInput = TypeOf<typeof checkResultSchema>
export type ClearMovesInput = TypeOf<typeof clearMovesSchema>

