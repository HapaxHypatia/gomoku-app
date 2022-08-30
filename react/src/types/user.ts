import {GameType} from "./gameType";

export type User = {
  username: string
  id?: number
  games?: GameType[]
}