export type GameState = {
    gameID?: string
    currentPlayer: "black" | "white"
    squares: {id:string, status:string}[],
    boardConfig: {boardSize:number, lineLength:number}
}