import React from "react";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {useLocation, useNavigate} from "react-router-dom";

export default function Win() {
    const location = useLocation();
    const game = location.state as any
    const navigate = useNavigate()
    const gameState = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    function restart(){
        localStorage.setItem(gameState.gameID!, JSON.stringify(gameState))
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
        navigate('/')
    }
    return (
        <>
        <h2>Congratulations!</h2>
        <div>{game.winner} wins!</div>
        <button type="button" id="restart" onClick={restart}>Start New Game</button>
        </>
    );
}