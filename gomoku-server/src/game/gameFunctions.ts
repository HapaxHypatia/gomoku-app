import GameModel, {GameDocument} from "./game.model";

export async function Game(
    gameId: string,
    squareId: string,
    squares: { id: string, status: string }[],
    player: string) {

    //get lineLength from db
    console.log("gameId: "+gameId)
    const game = await GameModel.findById(gameId)
    console.log(game)
    let lineLength:number
    if (game){lineLength = game.lineLength}

    function checkLine(direction: string) {

        const y = Number(squareId.slice(0, 2))
        const x = Number(squareId.slice(2, 4))
        console.log(direction, squareId)
        let line:number = 0;
        for (let i = 1; i < lineLength; i++) {
            const directions: { [key: string]: string } = {
                N: String(x).padStart(2, '0') + String(y - i).padStart(2, '0'),
                S: String(x).padStart(2, '0') + String(y + i).padStart(2, '0'),
                E: String(x + i).padStart(2, '0') + String(y).padStart(2, '0'),
                W: String(x - i).padStart(2, '0') + String(y).padStart(2, '0'),
                NE: String(x + i).padStart(2, '0') + String(y - i).padStart(2, '0'),
                SW: String(x - i).padStart(2, '0') + String(y + i).padStart(2, '0'),
                NW: String(x - i).padStart(2, '0') + String(y - i).padStart(2, '0'),
                SE: String(x + i).padStart(2, '0') + String(y + i).padStart(2, '0')
            }
            //find neighbouring cell in squares array by id
            let cell = squares.find((sq) =>
                sq.id === directions[direction])
            console.log(cell)

            if (!cell) {
                break;
            }
            if (cell.status === player) {
                line++;
            } else {
                break;
            }
        }
        return line;
    }

    function checkWin() {

        let NS = checkLine("N") + checkLine("S") === lineLength - 1 ? 1 : 0;
        let EW = checkLine("E") + checkLine("W") === lineLength - 1 ? 1 : 0;
        let NESW = checkLine("NE") + checkLine("SW") === lineLength - 1 ? 1 : 0;
        let NWSE = checkLine("NW") + checkLine("SE") === lineLength - 1 ? 1 : 0;
        return NS + EW + NESW + NWSE === 1
    }

    function checkDraw() {
        const freeSpace = squares.some((sq) => sq.status === "empty")
        if (!freeSpace) {
            return true
        }
    }

    if (checkDraw()) {
        return "draw"
    }
    if (checkWin()) {
        return "win"
    } else {
        return "continue"
    }
}

