import React, {useEffect, useState} from "react";
import {BoardRow} from "./index";
import { useAppSelector} from "../hooks/hooks";

function Board() {
    const boardSize = Number(useAppSelector((state) => state.boardConfig.boardSize))
    console.log("Boardsize in board component is "+boardSize)
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