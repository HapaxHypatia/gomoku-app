import React, {useEffect, useState} from "react";
import { UserContext } from "../context";
import { useContext } from "react";
import { Navigate } from "react-router-dom"
import {HistoryItem} from "../components";
import {GameType} from "../types";
import {get, post} from "../utils/http";

export default function GameHistory() {
    const { user } = useContext(UserContext)
    const [games, setGames] = useState<GameType[]>([])
    const fetchGames = async () => {
        if (user){
            const fetchedGames: GameType[] = await get(`/api/history/usergames/${user._id}`)
            //TODO not working because userid not present on req
            setGames(fetchedGames)
        }
        else{console.log("user id required")}
    }
    useEffect(() => {
        fetchGames()
    }, [])

    if (!user) return <Navigate to="/login" replace={true}/>
    return (
        <>
        <div></div>

        <ol id={"gamelog"}>
        {games.map((g) => <HistoryItem game={g}/>)}
        </ol>
        </>

);
}
