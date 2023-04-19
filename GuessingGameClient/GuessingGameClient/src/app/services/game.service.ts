import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDto } from '../interfaces/GameDto';
import { GuessRequest } from '../interfaces/GuessRequest';
import { GuessResponse } from '../interfaces/GuessResponse';
import { GameDtos } from '../interfaces/GameDtos';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseUrl:string = "http://localhost:5110/api/Games/"

  constructor(private http:HttpClient) { }

  createGame(userForm :any) :Observable<GameDto>{
    return this.http.post<GameDto>(this.baseUrl + 'new-game', userForm);
  }

  getGameById(gameId: number): Observable<GameDtos> {
    return this.http.get<GameDtos>(this.baseUrl + gameId);
  }

  guessNumber(guessRequest: GuessRequest):Observable<GuessResponse>{
    return this.http.post<GuessResponse>(this.baseUrl + 'guess-number', guessRequest);
  }

  getUserRating(){
    return this.http.get<any>(this.baseUrl + 'user-rating');
  }




}
