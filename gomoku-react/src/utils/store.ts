import { configureStore } from '@reduxjs/toolkit'
import {GameState} from "../types";

function gameReducer(state: GameState, action:any){

    switch (action.type){
        case "setID":
            return {...state, gameID: [action.payload]}
        case "setBoard":
            return {...state, boardConfig: action.payload}
        case "changePlayer":
            return {...state, currentPlayer: action.payload}
        case "updateSquare":
            const square = state.squares.find((sq) => sq.id===action.payload.id)
            if (!square){
                return {...state, squares: [...state.squares, action.payload]}
            }
            else{
                const squaresCopy = [...state.squares]
                const newSquares = squaresCopy.map((sq)=>
                    sq.id===action.payload.id? action.payload : sq
                )
                return {...state, squares: [...newSquares]}
            }
        default:
            return state
    }
}

export const store =configureStore({
    reducer :gameReducer,
    preloadedState: {
        currentPlayer: "black",
        squares: [],
        gameID: '',
        boardConfig: {boardSize:15, length:5}
        }
    })


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch