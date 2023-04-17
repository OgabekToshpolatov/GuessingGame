import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseUrl:string = "http://localhost:5110/api/Games"

  constructor(private http:HttpClient) { }

  createGame(data :any){
     
  }


}
