import React, {useContext, useEffect, useState} from "react";
import cross from "../img/cross.png"
import black from "../img/black.png"
import white from "../img/white.png"
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context";

type SquareProps = {
    id: string
    x: number
    y: number
    status: string
}

export default function Square(props: SquareProps) {
    const gameState = useAppSelector(state => state)
    const lineLength = useAppSelector((state) => state.length)
    const player =  useAppSelector((state)=> state.currentPlayer)
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

    function saveGame(){
    if (user){
        if (gameState.gameID){
            localStorage.setItem(gameState.gameID!, JSON.stringify(gameState))
            console.log("Game Saved in square")
        }
    }
}


    function checkLine(x:number, y:number, direction:string) {
        let line = 0;
        for (let i = 1; i < lineLength; i++) {
            const directions: { [key: string]: string }= {
                N: String(x).padStart(2,'0') +String(y-i).padStart(2,'0'),
                S: String(x).padStart(2,'0') +String(y+i).padStart(2,'0'),
                E: String(x+i).padStart(2,'0') +String(y).padStart(2,'0'),
                W: String(x-i).padStart(2,'0') +String(y).padStart(2,'0'),
                NE: String(x+i).padStart(2,'0') +String(y-i).padStart(2,'0'),
                SW: String(x-i).padStart(2,'0') +String(y+i).padStart(2,'0'),
                NW: String(x-i).padStart(2,'0') +String(y-i).padStart(2,'0'),
                SE: String(x+i).padStart(2,'0') +String(y+i).padStart(2,'0')
            }
            //find neighbouring cell in squares array by id
            let cell = gameState.squares.find((sq) => sq.id===directions[direction])

            if (!cell) {
                break;
            }
            if (cell.status===player) {
                line++;
            }else{
                break;
            }
        }
        return line;
    }
    function checkWin(x:number, y:number) {
        let NS = checkLine(x, y, "N") + checkLine(x, y, "S")===lineLength-1? 1:0;
        let EW = checkLine(x, y, "E") +checkLine(x, y, "W")===lineLength-1? 1:0;
        let NESW = checkLine(x, y, "NE") +checkLine(x, y, "SW")===lineLength-1? 1:0;
        let NWSE = checkLine(x, y, "NW") + checkLine(x, y, "SE") ===lineLength-1? 1:0;
        return NS + EW + NESW + NWSE===1;
    }

    function checkDraw(){
        const freeSpace = gameState.squares.some((sq) => sq.status==="empty")
        console.log(freeSpace)
        if (!freeSpace){
            console.log("draw")
            return true
        }
    }

    const placeStone = ()=>{
    //    onclick of square img
        if (status === "empty"){
            //place stone of current player colour
            let player = String(gameState.currentPlayer)
            setStatus(player)
            //add to moves array
            dispatch({type:'setState', payload:{
                moves: [...gameState.moves,
                    {id:id, player:player}]
                }})

            if (checkDraw()){
                //TODO: not working
                dispatch({type:'setState',
                    payload:{winner: "draw"}})
                saveGame()
                navigate('/draw')}

            // check for win
            if (checkWin(x,y)){
                console.log("win=true")
                //    update winner in gameState
                dispatch({type:'setState',
                    payload:{winner: player}})
                saveGame()
                //    navigate to win page
                navigate('/win', {state: {winner: player}})
            }

            //switch current player in gameState
            player = gameState.currentPlayer==="black"? "white": "black"
            dispatch({type: 'setState',
            payload: {
                currentPlayer: player
            }
            })
    }}
    return (
        <td id={id} height={"25px"} width={"25px"}>
        <img alt='' src={src} onClick={placeStone} className={status} width='25px' height='25px'/>
        </td>
    );
}

