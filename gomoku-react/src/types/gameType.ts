export type GameType = {
    gameID?: string,
    date?: string,
    boardSize: number,
    length: number,
    userID?: number,
    moves: {id:string, player:string}[],
    squares: {id:string, status:string}[],
    currentPlayer: "black" | "white",
    winner?: "black" | "white"|"draw" | undefined
}