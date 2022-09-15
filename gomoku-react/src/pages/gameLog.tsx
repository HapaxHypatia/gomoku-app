import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import Replay from "../components/replay";

export default function GameLog() {
    const gameID= useParams().id
    // @ts-ignore
    const game = JSON.parse(localStorage.getItem(gameID))
    const navigate = useNavigate()
    let moves = game.moves
    return (
        <div>
            <h2>Game Log</h2>

            <p>Date: {game.date}</p>
            <p>Winner: {game.winner}</p>
            <Replay id={game.gameID} moves={game.moves} boardSize = {game.boardSize}></Replay>
            <button onClick={() => navigate('/gameHistory')}>Back to game history</button>
        </div>
    );
}