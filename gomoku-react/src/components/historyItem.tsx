import React from "react";
import {useNavigate} from "react-router-dom";
import {del} from "../utils/http";

export default function HistoryItem(game:any) {
    const navigate = useNavigate()
    const G= game.game
    const gameId = G.gameID
    async function deleteGame(){
    await del(`api/game/${gameId}`)
    }

    function loadGame(){
        navigate('/gameLog/', {state:{game:G}})
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
        <li  id={"historyItem"}>
            <div id={"historyDetails"}>
                Played at {time} {day} {monthLong} {year}
            <br/>
            Winner: {G.winner}                 Number of moves: {G.moves.length}
            <br/>
            Board size: {G.boardSize}     Line length: {G.lineLength}
            </div>
            <div id={"historyButtons"}>
            <button onClick={loadGame}>See Game Log</button>
                <button>Delete Game</button>
            </div>

        </li>
    );
}