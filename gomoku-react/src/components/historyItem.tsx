import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {del} from "../utils/http";
import {UserContext} from "../context";

export default function HistoryItem(game:any) {
    const navigate = useNavigate()
    const G= game.game
    const gameId = G._id
    console.log(typeof gameId)

    const { user } = useContext(UserContext)

    async function deleteGame(){
        if(user){
            if (window.confirm('Are you sure you wish to delete this game?')){
                await del(`api/history/deleteGame/${gameId}/${user._id}`)
            }
        }
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
            <p>Played at {time} {day} {monthLong} {year}</p>
            <p>Winner: {G.winner}</p>
            <p>Number of moves: {G.moves.length}</p>
            <p>Board size: {G.boardSize}</p>
            <p>Line length: {G.lineLength}</p>
            </div>
            <div id={"historyButtons"}>
            <button onClick={loadGame}>See Game Log</button>
                <button onClick={deleteGame}>Delete Game</button>
            </div>

        </li>
    );
}