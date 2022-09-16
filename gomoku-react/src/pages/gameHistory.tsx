import React, {useEffect, useState} from "react";
import { UserContext } from "../context";
import { useContext } from "react";
import { Navigate } from "react-router-dom"
import {HistoryItem} from "../components";
import {GameType} from "../types";
import {get} from "../utils/http";

export default function GameHistory() {
    const { user } = useContext(UserContext)
    const [games, setGames] = useState('')
    const fetchGames = async () => {
        // const fetchedGames = await get<GameType[]>('/api/games')
        // setGames(fetchedGames)
    }
    useEffect(() => {
        fetchGames()
    }, [])

    if (!user) return <Navigate to="/login" replace={true}/>
    // const IDs =Object.keys(localStorage)
    //
    // const games: {}[] = []
    // for (let ID of IDs){
    //     games.push(JSON.parse(localStorage.getItem(ID)!))

    // }


    return (
        <>
        <ol id={"gamelog"}>
        {/*{games.map((g:{}) => <HistoryItem game={g}/>)}*/}
        </ol>
        </>

);
}
