import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Replay from "../components/replay";
import {get} from "../utils/http";
import {GameType} from "../types";


export default function GameLog() {
  const navigate = useNavigate()
  const {gameId} = useParams()
  console.log(gameId)
  const [Game, setGame] = useState<GameType>()

  const fetchGameDetails = async (id: string) => {
    const fetchedGame = await get<GameType>(`/api/history/${gameId}`)
    setGame(fetchedGame)
  }

  useEffect(() => {
      if(gameId){
        fetchGameDetails(gameId)
      }
  }, [gameId])

  if (!Game) return (
      <div>No game found</div>
  )
        
        
    let moves = Game.moves
    return (
        <div>
            <h2>Game Log</h2>

            <p>Date: {Game.createdAt}</p>
            <p>Winner: {Game.winner}</p>
            <Replay id={Game._id} moves={Game.moves} boardSize = {Game.boardSize}></Replay>
            <button onClick={() => navigate('/gameHistory')}>Back to game history</button>
        </div>
    );
}