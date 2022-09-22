import React from "react";
import {Square} from "./index";
import {useAppSelector} from "../hooks/hooks";


type BoardRowProps = {
    row: number
}

function BoardRow (props: BoardRowProps) {
    const boardSize = Number(useAppSelector((state) => state.boardConfig.boardSize))

    const {row} = props
    console.log("row number = "+row)

    const squares = [];
    for (let i = 0; i<boardSize; i++){
        let squareID = String(row).padStart(2,'0') +String(i).padStart(2,'0')
        squares.push(<Square id={squareID}></Square>)

    }
    return (
        <tr id={String(row)}>
            {squares}
        </tr>
    );
}

export default BoardRow