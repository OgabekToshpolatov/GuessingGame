export interface GameDtos{
  id: number;
  secretNumber: number;
  numberOfTries: number;
  maximumTries: number;
  isFinish: boolean;
  isWinner: boolean;
  userId: number;
  gameTries:GameTries[];
}

export interface GameTries{
  guessNumber: number;
  message: string;
}
