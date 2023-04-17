import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDto } from 'src/app/interfaces/GameDto';
import { GuessResponse } from 'src/app/interfaces/GuessResponse';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  numberForm!:FormGroup
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
    }

}
