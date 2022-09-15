import React from "react";
import {useAppDispatch} from "../hooks/hooks";

export default function Draw() {
    const dispatch = useAppDispatch()
    dispatch({type:"setState", payload:{

            gameID: "",
            date: "",
            userID: 0,
            boardSize: 0,
            length: 0,
            moves: [],
            squares: [],
            currentPlayer: "black",
            winner: undefined
            }})

    return (
        <div>Draw</div>
    );
}