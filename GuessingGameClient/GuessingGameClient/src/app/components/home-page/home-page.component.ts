import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
   ){}
   ngOnInit(): void {
    console.log("nimadir bolayabdi lekin ")
    this.userForm = this.fb.group({
      username:['',Validators.required],
    })
   }
   get f(){
    return this.userForm.controls;
  }

   submitUsername(){
    if(this.userForm.valid){

    }

   }
}
