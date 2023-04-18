export interface GuessResponse{
  message: string,
  isFinish: boolean,
  isWinner: boolean,
  secretNumber: number,
  numberOfTriesRest: number
}
