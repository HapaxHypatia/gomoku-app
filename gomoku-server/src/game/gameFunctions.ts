import GameModel, {GameDocument} from "./game.model";
import mongoose, {DocumentDefinition} from "mongoose";


export function checkLine (x:number, y:number, squareID:string,
                   direction:string, lineLength:number,
                   gameState:{currentPlayer:string, squares:{id:string, status:string}[]}){
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
        let cell = gameState.squares.find((sq) =>
            sq.id===directions[direction])

        if (!cell) {
            break;
        }
        if (cell.status===gameState.currentPlayer) {
            line++;
        }else{
            break;
        }
    }
    return line;
}

// export function checkWin (){
//     let NS = checkLine(x, y, "N", lineLength) + checkLine(x, y, "S")===lineLength-1? 1:0;
//     let EW = checkLine(x, y, "E", lineLength) +checkLine(x, y, "W")===lineLength-1? 1:0;
//     let NESW = checkLine(x, y, "NE", lineLength) +checkLine(x, y, "SW")===lineLength-1? 1:0;
//     let NWSE = checkLine(x, y, "NW", lineLength) + checkLine(x, y, "SE") ===lineLength-1? 1:0;
//     return NS + EW + NESW + NWSE===1
// }



export function checkDraw (squares:{id:string, status:string}[]){
    const freeSpace = squares.some((sq) => sq.status==="empty")
    if (!freeSpace){
        return true
    }
}
