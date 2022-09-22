import React, {useContext, useEffect, useState} from "react";
import cross from "../img/cross.png"
import black from "../img/black.png"
import white from "../img/white.png"
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {useNavigate} from "react-router-dom";
import {post, put} from "../utils/http";
import userContext from "../context/UserContext";
import {UserContext} from "../context";

type SquareProps = {
    id: string
}

export default function Square(props: SquareProps) {
    const gameState = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const {id} = props
    const [status, setStatus] = useState<string>("empty");
    const [src, setSrc] = useState(cross)
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    useEffect(()=>{
        //Create or update square in state
        const found = gameState.squares.some(sq => sq.id === id);
        if (!found){dispatch({
            type: 'createSquare',
            payload:{id:id, status:"empty"}})}
        else{dispatch({
            type: "updateSquare",
            payload:{id: id, status:status}})}
        //update square img according to status
        switch (status){
            case "empty":
                setSrc(cross)
                break
            case "black":
                setSrc(black)
                break
            case "white":
                setSrc(white)
                break
            default:
                setSrc(cross)
        }
    }, [status])

    const placeStone = async ()=>{
        const player =  gameState.currentPlayer
        const gameId = gameState.gameID
        if (status === "empty"){
            //might not have updated state? Watch for this
            // Change square status to current player
            setStatus(player)

            //    DB calls
            await put(`/api/game/update`,
                {square: id, player: player, userId: user._id, gameId: gameId})
            const result = await post('/api/game/check', {
            gameId: gameState.gameID,
            squareId:id,
            squares: gameState.squares,
            userId: user._id,
            //    gamestate hasn't updated here yet
            player: player
            })
            console.log(result)
            if (result =="win"){
                //    TODO update winner in db
                //    navigate to win page
                navigate('/win', {state: {winner: player}})
            }
            //switch current player in gameState
            const newPlayer = player==="black"? "white": "black"
            dispatch({type: 'changePlayer',payload: newPlayer})
        }
    }

    return (
        <td id={id} height={"25px"} width={"25px"}>
        <img alt='' src={src} onClick={placeStone} className={status} width='25px' height='25px'/>
        </td>
    );
}

