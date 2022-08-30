import React from "react";
import {useNavigate} from "react-router-dom";

export default function HistoryItem(game:any) {
    const navigate = useNavigate()
    const G= game.game

    function loadGame(){
        const gameID = String(G.gameID)
        navigate(`/gameLog/${gameID}`)
    }
    return (
        <li onClick={loadGame}>
            {G.date} {G.winner}
        </li>
    );
}