import React, {useState} from "react";
import {BoardRow} from "./index";
import { useAppSelector} from "../hooks/hooks";


function Board() {
    const boardSize = useAppSelector((state) => state.boardSize)
    const [squares, setSquares] = useState<{string:string}[]>([])
    const rows=Array.from(Array(boardSize).keys())

    return (
        <>
        <table id={"board"}>
            <tbody>
            {rows.map((r:number) => <BoardRow row={r}/>)}
            </tbody>
        </table>

        </>

    );
}

export default Board;