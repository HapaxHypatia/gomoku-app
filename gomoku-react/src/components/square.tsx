import React, {useContext, useEffect, useState} from "react";
import cross from "../img/cross.png"
import black from "../img/black.png"
import white from "../img/white.png"
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context";
import {post} from "../utils/http";

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

    const placeStone = ()=>{
    // Change square status to current player
        const player =  gameState.currentPlayer
        if (status === "empty"){
            //might not have updated state? Watch for this
            setStatus(player)

        //    DB calls
        //    TODO update moves array
        //    requires squareID, player
        //    TODO check for win/draw
        post('/api/game/check', {})

            console.log("win=true")
            //    TODO update winner in db
            //    navigate to win page
            navigate('/win', {state: {winner: player}})
        }


        //switch current player in gameState
        let newPlayer = player==="black"? "white": "black"
        dispatch({type: 'changePlayer',payload: {newPlayer}})
    }


//     const placeStone = ()=>{
//     //    onclick of square img
//         if (status === "empty"){
//             //place stone of current player colour
//             let player = String(gameState.currentPlayer)
//             setStatus(player)
//             if (checkDraw()){
//                 //TODO: checkDraw serverside
//                 dispatch({type:'setState',
//                     payload:{winner: "draw"}})
//                 saveGame()
//                 navigate('/draw')}
//
//             // TODO check for win serverside
//
//             function checkLine (x, y, "N", lineLength, player){
//                 //send object with x, y, direction, lineLength, player as params
//             }
//
//             let NS = checkLine(x, y, "N", lineLength) + checkLine(x, y, "S")===lineLength-1? 1:0;
//             let EW = checkLine(x, y, "E", lineLength) +checkLine(x, y, "W")===lineLength-1? 1:0;
//             let NESW = checkLine(x, y, "NE", lineLength) +checkLine(x, y, "SW")===lineLength-1? 1:0;
//             let NWSE = checkLine(x, y, "NW", lineLength) + checkLine(x, y, "SE") ===lineLength-1? 1:0;
//             return NS + EW + NESW + NWSE===1;
// }
//
//             if (checkWin(x,y)){
//                 console.log("win=true")
//                 //    TODO update winner in db
//                 dispatch({type:'setState',
//                     payload:{winner: player}})
//                 saveGame()
//                 //    navigate to win page
//                 navigate('/win', {state: {winner: player}})
//             }
//
//             //switch current player in gameState
//             player = gameState.currentPlayer==="black"? "white": "black"
//             dispatch({type: 'changePlayer',payload: {player}})
//     }
//
    return (
        <td id={id} height={"25px"} width={"25px"}>
        <img alt='' src={src} onClick={placeStone} className={status} width='25px' height='25px'/>
        </td>
    );
}

