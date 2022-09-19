import React from "react";
import {useNavigate} from "react-router-dom";

export default function HistoryItem(game:any) {
    const navigate = useNavigate()
    const G= game.game

    function loadGame(){
        const gameID = String(G.gameID)
        navigate(`/gameLog/${gameID}`)
    }
    const dateString = G.date
    const year = dateString.slice(0, 4)
    const month = dateString.slice(5,7)
    const day = dateString.slice(8,10)
    const time = dateString.slice(11,16)


    return (
        <li onClick={loadGame}>
            Played at {time} {day} {month} {year}
            <br/>
            Winner: {G.winner}
            <br/>
            Board size: {G.boardSize}
            <br/>
            Length: {G.length}
            <br/>
        </li>
    );
}