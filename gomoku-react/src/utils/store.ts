import { configureStore } from '@reduxjs/toolkit'
import {GameType, User} from "../types";
import userContext from "../context/UserContext";
import {useContext} from "react";
import {UserContext} from "../context";
import {GameState} from "../types/gameState";

const initialGameState: GameState = {
    currentPlayer: "black",
    squares: []
    }

function gameReducer(state: GameState, action:any){

    switch (action.type){
        // case "setID":{...state, state.gameID: [...action.payload]}
        //     return
        // case "changePlayer":
        //     return {...state, action.payload}
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