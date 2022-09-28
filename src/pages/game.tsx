import {Board} from "../components";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, } from "react";
import {UserContext} from "../context";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {post, put} from "../utils/http";
import {API_HOST} from "../utils/constants";



export default function Game() {
    const gameState = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const {boardSize, length} = useParams()
    const { user } = useContext(UserContext)
    let gameId

    const navigate = useNavigate()
    const createGame = async ()=> {
        //create db entry and return gameID
        if (user){
        const newGame: any = await post(`${API_HOST}/api/game`, {
                game:{
                    boardSize: Number(boardSize),
                    lineLength: Number(length),
                    moves: [],
                    winner: "none"
                },
                userId: user._id
            })
            gameId=newGame._id
            dispatch({type: "setID", payload: newGame._id})
            dispatch({type: "setBoard", payload: {boardSize: boardSize, length: length}})
        }
    }

    useEffect(() => {
        createGame()
        }, [boardSize])

    const reset = async ()=>{
        const gameId = gameState.gameID
        await put(`${API_HOST}/api/game/clear`, {gameId:gameId})
        dispatch({type:"changePlayer", payload:"black"})
        window.location.reload();
    }

    if (!user) return <Navigate to="/login" replace={true}/>

        return (
        <>
        <div id={"boardContainer"}>
        <Board/>
        </div>
        <div id="info">Current Player: {gameState.currentPlayer}</div>
        <button type="reset" id="resetButton" onClick={reset}>Reset Board</button>
        <button type="button" id="restart" onClick={()=>navigate('/')}>Start New Game</button>
        </>
    );

}
