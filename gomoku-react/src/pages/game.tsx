import {Board} from "../components";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";

export default function Game() {
    const gameState = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const {boardSize, length} = useParams()
    const now = new Date()
    const date = now.toUTCString()
    const { user } = useContext(UserContext)
    const ID = now.toISOString()

    const navigate = useNavigate()



    useEffect(() => {
        dispatch({type: 'setState',
            payload: {
                gameID: ID,
                date: date,
                boardSize: Number(boardSize),
                length: Number(length),
                user: user,
                currentPlayer: "black",
                winner: undefined
            }
        })
        }  , [boardSize, length]
    )

    function saveGame(){
        if (user){
        if (gameState.gameID){
                localStorage.setItem(gameState.gameID!, JSON.stringify(gameState))
                console.log("Game Saved in game")
            }
        }
    }

    useEffect(()=> {
        saveGame()}, [gameState.gameID, gameState.winner, gameState.moves, gameState.currentPlayer, gameState.squares])

    function reset() {
        // clear moves array & switch player
        dispatch({type: 'setState',
                payload:{
                        moves: [],
                        currentPlayer: "black"
                    }
                }
        )
    }

    function leave(){
        if (gameState.winner){
            saveGame()
            navigate('/gameHistory')
        }
        else{
            localStorage.removeItem(gameState.gameID!)
            navigate('/')}
    }
    if (!user) return <Navigate to="/login" replace={true}/>

        return (
        <>
        <div id={"boardContainer"}>
        <Board/>
        </div>
        <div id="info">Current Player: {gameState.currentPlayer}</div>
        <button type="reset" id="resetButton" onClick={reset} >Reset Board</button>
        <button type="button" id="restart" onClick={()=>navigate('/')}>Start New Game</button>
        <button type="button" id="leave" onClick={leave} >Leave Game</button>
        </>
    );

}
