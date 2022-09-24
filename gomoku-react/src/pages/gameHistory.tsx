import React, {useEffect, useState} from "react";
import { UserContext } from "../context";
import { useContext } from "react";
import { Navigate } from "react-router-dom"
import {HistoryItem} from "../components";
import {GameType, User} from "../types";
import {del, get, post} from "../utils/http";

export default function GameHistory() {
    const { user } = useContext(UserContext)
    const [games, setGames] = useState<GameType[]>([])
    const [username, setUsername] = useState('username')

    async function deleteUnfinishedGames(){
        await del('api/history/deleteUnfinished/')
    }
    async function deleteUserHistory(){
        if (user){
            if (window.confirm('Are you sure you wish to delete all your history?')){
            await del(`api/history/deleteHistory/${user._id}`)}
        }

    }
    useEffect(() => {
        deleteUnfinishedGames()
        }, [])
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

    if (!user) return <Navigate to="/login" replace={true}/>
    return (
        <>
        <h2>Game history for user: {username} </h2>
        <div id={'historyListContainer'}>
        <ul id={"gamelog"}>
        {games.map((g) => <HistoryItem key = {g._id} game={g}/>)}
        </ul>
        </div>
        <button onClick={deleteUserHistory}>Delete Game History</button>
        </>

);
}
