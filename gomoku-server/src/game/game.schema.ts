import { object, string, number, array, TypeOf } from 'zod'
import mongoose from "mongoose";

const payload = {
  //input to create a game

  body: object({
    boardSize: number({
      required_error: 'Board size is required',
    }),
    length: number({
      required_error: 'Line length is required',
    }),
  }),
}

const updateDeleteParams = {
  //input to update a game
  params: object({
    id: string({
      required_error: 'Game id is required',
    }),
  }),
}

export const createGameSchema = object({
  ...payload,
})
export const updateGameSchema = object({
  ...payload,
  ...updateDeleteParams,
})
export const deleteGameSchema = object({
  ...updateDeleteParams,
})


export type CreateGameInput = TypeOf<typeof createGameSchema>
export type UpdateGameInput = TypeOf<typeof updateGameSchema>
export type DeleteGameInput = TypeOf<typeof deleteGameSchema>
