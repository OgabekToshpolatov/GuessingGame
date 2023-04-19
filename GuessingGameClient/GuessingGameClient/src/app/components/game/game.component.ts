import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDto } from 'src/app/interfaces/GameDto';
import { GuessRequest } from 'src/app/interfaces/GuessRequest';
import { GuessResponse } from 'src/app/interfaces/GuessResponse';
import { GameService } from 'src/app/services/game.service';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GameDtos } from 'src/app/interfaces/GameDtos';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  numberForm!:FormGroup
  gameDtos?: GameDtos;
  guessResponse?: GuessResponse;
  otherTriesResult: string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog:MatDialog,) {}

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

          this.gameDtos = data as GameDtos;
          console.log(this.gameDtos);
          console.log("#########################",this.gameDtos.maximumTries)
          console.log("PPPPPPPPPPPPPPPP",this.gameDtos.numberOfTries);
          console.log(this.gameDtos.secretNumber)
          console.log(this.gameDtos.isWinner)
          console.log("IsFinished ======================>",this.gameDtos.isFinish)

          if(this.gameDtos.userId.toString() !== localStorage.getItem('userId')){
            this.router.navigate(['/']);
          }
        }
      )
      console.log(this.otherTriesResult.length);
      console.log("MASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
      for(const str of this.otherTriesResult){
        console.log(str);
      }
      console.log("MASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")

    }
    get f(){
      return this.numberForm.controls;
    }



    isGuessResponseNotNull(): boolean{
      if(this.guessResponse)
        return true;

      return false;
    }

    getGameTries(){
      console.log("FDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"+this.gameDtos?.gameTries);
      return this.gameDtos?.gameTries;
    }

    openDialog(){
      this.dialog.open(GameDialogComponent,{
        width:"30%"
      })
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

    numberOfRest(){
      return (8-Number(this.gameDtos?.numberOfTries));
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
          console.log("Salom salom salom salom ",this.guessResponse.message)
          const otherTries:string[] = [];
          otherTries
            .push(`Message: ${this.guessResponse.message} | Guess Number: ${guessRequest.guessNumber}`);
            for(const str of this.otherTriesResult){
              console.log(str);
            }

            this.router.navigate(['game'])
        },
        (error: HttpErrorResponse) => {
          alert(error.error.error);
        }
      );

    }

}

