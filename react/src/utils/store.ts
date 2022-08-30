import { configureStore } from '@reduxjs/toolkit'
import {GameType} from "../types";


const initialGameState: GameType = {
            gameID: "",
            date: "",
            userID: 0,
            boardSize: 0,
            length: 0,
            moves: [],
            squares: [],
            currentPlayer: "black",
            winner: undefined
    }

function gameReducer(state: GameType = {
    boardSize: 15,
    length: 5,
    moves: [],
    squares: [],
    currentPlayer: "black",
    winner: undefined
}, action:any){

    switch (action.type){
        case "setState":
            return {...state, ...action.payload}
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
  //...
    reducer:gameReducer,
    preloadedState: initialGameState
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch