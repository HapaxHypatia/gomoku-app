import React, {useContext, useEffect, useState} from "react";
import cross from "../img/cross.png"
import black from "../img/black.png"
import white from "../img/white.png"
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context";
import {post, put} from "../utils/http";

type SquareProps = {
    id: string
    x: number
    y: number
    status: string
}

export default function Square(props: SquareProps) {
    const gameState = useAppSelector(state => state)
    //length is now in db not state
    // const lineLength = useAppSelector((state) => state.length)

    const user = useContext(UserContext)
    const dispatch = useAppDispatch()
    const {id, x, y} = props
    const [status, setStatus] = useState<string>("empty");
    const [src, setSrc] = useState(cross)
    const navigate = useNavigate()

    useEffect(()=>{
        //Create or update square in state
        dispatch({type: "updateSquare", payload:{
        id: id, status:status
            }})
        //Find current square by id in array and update status
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
            console.log(await put(`/api/game/${gameId}`,
                {square: id, player: player}
            ))
            const result = await post('/api/game/check', {
            gameId: gameState.gameID,
            squareId:id,
            squares: gameState.squares,
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

