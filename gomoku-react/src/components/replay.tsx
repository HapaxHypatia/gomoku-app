import React, {useState} from "react";
import cross from "../img/cross.png"
import black from "../img/black.png"
import white from "../img/white.png"

type ReplayProps = {
    id:string
    boardSize: number
    moves: {square:string, player:string}[]
}

export default function Replay(props:ReplayProps) {
    const {id, boardSize, moves} = props
    const [count, setCount] = useState(0)

    //create table
    const rows=Array.from(Array(boardSize).keys())
    const squares=Array.from(Array(boardSize).keys())

    const children  = rows.map((r)=>
        (<tr>{squares.map((sq)=>
            (<td id={String(r).padStart(2,'0') +String(sq).padStart(2,'0')} height={'25px'} width={'25px'}>
                <img id={"img"+String(r).padStart(2,'0') +String(sq).padStart(2,'0')} alt='' src={cross}  width='25px' height='25px'/></td>))}
        </tr>))

    function next(){
        //get square by ID
        const player = moves[count].player
        const squareID = moves[count].square
        let img = document.getElementById("img"+squareID)
        let src
        if (player=="black"){
            src=black
        }
        else{
            src=white
        }
        //change img src to player colour
        img!.setAttribute("src", src)
        //set text to count
        setCount(count+1)
    }

    return (
        <>
        <table id={"replay-board"}>
            <tbody>
            {children}
            </tbody>
        </table>
        <p>Move #{count}</p>
        <button id={"next"} onClick={next}>Show next move</button>
        </>
    );
}