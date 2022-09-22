import { configureStore } from '@reduxjs/toolkit'
import {GameState} from "../types";
const initialState:GameState =
    {
    gameID: '',
    currentPlayer: "black",
    squares: [],
    boardConfig: {boardSize:0, lineLength:5}
    }


function gameReducer(state: GameState|undefined=initialState, action:any){

    switch (action.type){
        case "setID":
            return {...state, gameID: action.payload}
        case "setBoard":
            return {...state, boardConfig: action.payload}
        case "changePlayer":
            return {...state, currentPlayer: action.payload}
        case "createSquare":
            return {...state, squares: [...state.squares, action.payload]}
        case "updateSquare":
            return {...state, squares: state.squares.map(square => {
                if (square.id !== action.payload.id) {
                    return square
                }
                return {
                    ...square,
                    id: action.payload.id, status: action.payload.status
                }
                })
            }
        default:
            return state
    }
}

export const store =configureStore({
    reducer :gameReducer,
    })


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch