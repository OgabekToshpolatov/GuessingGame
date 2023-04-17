import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public userForm!:FormGroup;

   constructor(
    private fb:FormBuilder,
    private router:Router,
    private gameService:GameService
   ){}
   ngOnInit(): void {
    this.userForm = this.fb.group({
      userName:['',Validators.required],
    })
   }

   get f(){
    return this.userForm.controls;
  }

   createNewGame(){
    console.log(this.userForm.value)
    if(this.userForm.valid){
      this.gameService.createGame(this.userForm.value)
           .subscribe({
            next:(res) => {
              console.log(res);
              localStorage.setItem('userName',this.userForm.get('userName')?.value);
              localStorage.setItem('userId',res.userId.toString());
              alert("succesfully Create")
              this.userForm.reset()
              this.router.navigate(['game'])
            },
            error:(err) => {
              console.error(err.error.message);
            }
           })
    }
   }
}
