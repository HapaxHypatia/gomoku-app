import React, {useEffect, useState} from "react";
import cross from "../img/cross.png"
import black from "../img/black.png"
import white from "../img/white.png"

type replayProps = {
    boardSize:number
    moves: {square:string, player:string}[]
}


export default function Replay(props:replayProps ) {
    const [count, setCount] = useState(0)
    const {boardSize, moves} = props

    //create table
    const rows=Array.from(Array(boardSize).keys())
    const squares=Array.from(Array(boardSize).keys())

    const children  = rows.map((r)=>
            (<tr key={r}>{squares.map((sq)=>
                (<td key={sq} id={String(r).padStart(2,'0') +String(sq).padStart(2,'0')} height={'25px'} width={'25px'}>
                    <img id={"img"+String(r).padStart(2,'0') +String(sq).padStart(2,'0')} alt='' src={cross}  width='25px' height='25px'/></td>))}
            </tr>))

    function next(){
        //get square by ID
        if (count<moves.length){
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