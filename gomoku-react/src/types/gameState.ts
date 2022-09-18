export type GameState = {
    gameID?: string
    currentPlayer: "black" | "white"
    squares: {id:string, status:string}[],
    boardSize: number
}