export interface GameDto{
  id: number,
  secretNumber: number,
  numberOfTries: number,
  maximumTries: number,
  isFinish: boolean,
  isWinner: boolean,
  userId: number
}
