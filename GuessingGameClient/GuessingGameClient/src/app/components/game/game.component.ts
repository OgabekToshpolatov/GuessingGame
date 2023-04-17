import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDto } from 'src/app/interfaces/GameDto';
import { GuessRequest } from 'src/app/interfaces/GuessRequest';
import { GuessResponse } from 'src/app/interfaces/GuessResponse';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  numberForm!:FormGroup
  gameDto?: GameDto;
  guessResponse?: GuessResponse;
  otherTriesResult: string[] = [];
  constructor(private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private formBuilder: FormBuilder) {}

    ngOnInit(): void {
      this.numberForm = this.formBuilder.group({
        thousands: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9)]),
        hundreds: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9)]),
        tens: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9)]),
        ones: new FormControl('', [Validators.required, Validators.min(0), Validators.max(9)])
      });

      var gameIdStorage = localStorage.getItem("gameId");
      var gameId = Number(gameIdStorage);
      this.gameService.getGameById(gameId).subscribe(
        (data:any) => {
          this.gameDto = data as GameDto;

          if(this.gameDto.userId.toString() !== localStorage.getItem('userId')){
            this.router.navigate(['/']);
          }
        }
      )

    }
    get f(){
      return this.numberForm.controls;
    }

    getNumber(): number{
      const guessNumber = this.numberForm.get('thousands')?.value * 10000
                        + this.numberForm.get('hundreds')?.value * 1000
                        + this.numberForm.get('tens')?.value * 100
                        + this.numberForm.get('ones')?.value*10;
                        console.log("sas"+this.numberForm.get('thousands')?.value)
                        console.log("sasas"+this.numberForm.get('hundreds')?.value)
                        console.log("aadad"+this.numberForm.get('tens')?.value)
                        console.log("ffff"+this.numberForm.get('ones')?.value)

      return guessNumber/10;
    }

    sendNumberForm(){
       console.log(this.getNumber());
       var userNameStorage = localStorage.getItem("userName");
       var gameIdStorage = localStorage.getItem("gameId");

       const guessRequest: GuessRequest = {
        userName: userNameStorage ?? 'userFake',
        gameId: Number(gameIdStorage),
        guessNumber: this.getNumber()
      };

      this.gameService.guessNumber(guessRequest).subscribe(
        (data: any) => {
          this.guessResponse = data as GuessResponse;
          this.otherTriesResult
            .push(`Message: ${this.guessResponse.message} | Guess Number: ${guessRequest.guessNumber}`);
        },
        (error: HttpErrorResponse) => {
          alert(error.error.error);
        }
      );

    }

}

