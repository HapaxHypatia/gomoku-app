import React from "react";
import {useNavigate} from "react-router-dom";

export default function HistoryItem(game:any) {
    const navigate = useNavigate()
    const G= game.game

    function loadGame(){
        const gameID = String(G._id)
        navigate(`/gameLog/${gameID}`)
    }
    const dateString = G.date
    const year = dateString.slice(0, 4)
    const month = dateString.slice(5,7)
    const months = {
        '01':'January',
        '02':'February',
        '03':'March',
        '04':'April',
        '05':'May',
        '06':'June',
        '07':'July',
        '08':'August',
        '09':'September',
        '10': 'October',
        '11':'November',
        '12':'December'}
    // @ts-ignore
    const monthLong: string = months[month]
    const day = dateString.slice(8,10)
    const time = dateString.slice(11,16)


    return (
        <li onClick={loadGame}>
            Played at {time} {day} {monthLong} {year}
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