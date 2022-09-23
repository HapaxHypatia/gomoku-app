import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hooks/hooks";

export default function Home() {
    const nav = useNavigate()
    const [boardSize, setBoardSize] = useState<number>(15)
    const [length, setLength] = useState<number>(5)
    const dispatch = useAppDispatch()

    //clear previous state
    dispatch({type:"resetState"})

    function handleSetup(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        dispatch({
            type: "setBoard",
            payload: {boardSize: boardSize, length: length}})
        let path = `/game/${boardSize}/${length}`
        nav(path)
    }
    return (
        <div id="userInput">
            <form onSubmit={handleSetup}>
                <label htmlFor="size">Choose board size </label>
                <input type="number"
                       onChange= {(e) => {
                           setBoardSize(parseInt(e.target.value));}}
                       name="boardSize" id="boardSize" min="5" max={99} size={4} value={boardSize}/>
                <br/>
                <label htmlFor="lineLength">Select number in a row to win </label>
                <input type="number"
                       onChange={(e) => {setLength(parseInt(e.target.value))}}
                       name = "length" id="lineLength" min={3} size={4} value={length}/>
                <br/>
                <button type="submit" id="startButton" >Setup Game</button>
            </form>
        </div>
);
}