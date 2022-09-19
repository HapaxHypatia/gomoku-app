import {Board} from "../components";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {post} from "../utils/http";



export default function Game() {
    const gameState = useAppSelector(state => state)
    const [game, setGame] = useState('')
    const dispatch = useAppDispatch()
    const {boardSize, length} = useParams()
    const now = new Date()
    const date = now.toUTCString()
    const { user } = useContext(UserContext)

    const navigate = useNavigate()
    const createGame = async ()=> {
        //create db entry and return gameID
        const newgame: any = await post('/api/game', {
            boardSize: Number(boardSize),
            length: Number(length),
            gameUser: user,
            moves: [],
            winner: "none"
        })
        dispatch({type: "setID", payload: newgame._id})
        dispatch({type: "setBoard", payload: {boardSize: boardSize, length: length}})
    }

    useEffect(() => {
        createGame()
        }, [boardSize])

    function reset() {
        // // clear moves array & switch player
        // dispatch({type: 'setState',
        //         payload:{
        //                 moves: [],
        //                 currentPlayer: "black"
        //             }
        //         }
        // )
    }

    function leave(){
        // if (gameState.winner){
        //
        //     saveGame()
        //     navigate('/gameHistory')
        // }
        // else{
        //     localStorage.removeItem(gameState.gameID!)
        //     navigate('/')}
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
