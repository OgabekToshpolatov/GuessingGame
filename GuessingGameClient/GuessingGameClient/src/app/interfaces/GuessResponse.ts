export interface GuessResponse{
  message: string,
  isFinished: boolean,
  isWinner: boolean,
  secretNumber: number,
  numberOfTriesRest: number
}
