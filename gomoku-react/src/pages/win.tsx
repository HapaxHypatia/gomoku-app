import React from "react";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {useLocation, useNavigate} from "react-router-dom";

export default function Win() {
    const location = useLocation();
    const game = location.state as any
    const navigate = useNavigate()
    const gameState = useAppSelector(state => state)
    return (
        <>
        <h2>Congratulations!</h2>
        <div>{game.winner} wins!</div>
        <button type="button" id="restart" onClick={()=>navigate('/')}>Start New Game</button>
        </>
    );
}