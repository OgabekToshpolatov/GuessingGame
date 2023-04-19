import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css']
})
export class GameDialogComponent implements OnInit{

    userForm!:FormGroup
    constructor(
      private gameService:GameService,
      private formBuilder:FormBuilder,
      private matdialog:MatDialogRef<GameDialogComponent>,
      private router:Router,
      @Inject(MAT_DIALOG_DATA) public editData:any
      ){}
    ngOnInit(): void {
      console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
      this.userForm = this.formBuilder.group({
        userName:new FormControl(localStorage.getItem('userName'))
      })
    }

    getuserName(){
      return localStorage.getItem("userName");
    }

    createNewGame(){
      console.log(this.userForm.value)
      if(this.userForm.valid){
        this.gameService.createGame(this.userForm.value)
             .subscribe({
              next:(res) => {
                localStorage.setItem('userName',this.userForm.get('userName')?.value);
                localStorage.setItem('userId',res.userId.toString());
                localStorage.setItem('gameId',res.id.toString());
                this.userForm.reset()
                this.matdialog.close("save")
                alert("succesfully Create")
                this.userForm.reset()
                this.router.navigate(['game']).then(() => { window.location.reload() })
              },
              error:(err) => {
                console.error(err.error.message);
              }
             })
      }
     }

}
