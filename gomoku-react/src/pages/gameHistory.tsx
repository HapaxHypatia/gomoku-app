import React, {useEffect, useState} from "react";
import { UserContext } from "../context";
import { useContext } from "react";
import { Navigate } from "react-router-dom"
import {HistoryItem} from "../components";
import {GameType, User} from "../types";
import {get, post} from "../utils/http";

export default function GameHistory() {
    const { user } = useContext(UserContext)
    const [games, setGames] = useState<GameType[]>([])
    const [username, setUsername] = useState('username')
    const fetchUsername = async () =>{
        if (user){
            const name: {username:string} = await get(`/api/auth/${user._id}`)
            setUsername(name.username)
        }
    }
    const fetchGames = async () => {
        if (user){
            const fetchedGames: GameType[] = await get(`/api/history/usergames/${user._id}`)
            setGames(fetchedGames)
        }
        else{console.log("user id required")}
    }
    useEffect(() => {
        fetchGames()
        fetchUsername()
    }, [])

    console.log("username = "+username)
    if (!user) return <Navigate to="/login" replace={true}/>
    return (
        <>
        <h2>Game History for User: {username} </h2>

        <ol id={"gamelog"}>
        {games.map((g) => <HistoryItem game={g}/>)}
        </ol>
        </>

);
}
