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
          this.gameDto = data as GameDto;
          console.log("#########################",this.gameDto.maximumTries)
          console.log("PPPPPPPPPPPPPPPP",this.gameDto.numberOfTries);
          console.log(this.gameDto.secretNumber)
          console.log(this.gameDto.isWinner)
          console.log("IsFinished ======================>",this.gameDto.isFinish)

          if(this.gameDto.userId.toString() !== localStorage.getItem('userId')){
            this.router.navigate(['/']);
          }
        }
      )

    }
    get f(){
      return this.numberForm.controls;
    }

    isGuessResponseNotNull(): boolean{
      if(this.guessResponse)
        return true;

      return false;
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
      return (8-Number(this.gameDto?.numberOfTries));
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
            this.router.navigate(['game']).then(() => { window.location.reload() })
        },
        (error: HttpErrorResponse) => {
          alert(error.error.error);
        }
      );

    }

}

