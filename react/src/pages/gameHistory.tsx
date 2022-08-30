import React from "react";
import { UserContext } from "../context";
import { useContext } from "react";
import { Navigate } from "react-router-dom"
import {BoardRow, HistoryItem} from "../components";

export default function GameHistory() {
    const { user } = useContext(UserContext)
    if (!user) return <Navigate to="/login" replace={true}/>
    const IDs =Object.keys(localStorage)

    const games: {}[] = []
    for (let ID of IDs){
        games.push(JSON.parse(localStorage.getItem(ID)!))
    }

    return (
        <>
        <ol id={"gamelog"}>
        {games.map((g:{}) => <HistoryItem game={g}/>)}
        </ol>
        </>

);
}
