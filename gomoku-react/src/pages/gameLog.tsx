import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Replay from "../components/replay";



export default function GameLog() {
    const navigate = useNavigate()
    const location = useLocation()
    const game = location.state.game
    const boardSize:number = game.boardSize
    const moves:{square:string, player:string}[] = game.moves
    console.log(game)

    return (
        <div>
            <h2>Game Log</h2>

            <p>Date: {game.date}</p>
            <p>Winner: {game.winner}</p>
            <Replay boardSize={boardSize} moves={moves}></Replay>
            <button onClick={() => navigate('/gameHistory')}>Back to game history</button>
        </div>
    );
}