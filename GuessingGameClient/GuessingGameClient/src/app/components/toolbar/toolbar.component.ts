import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  IsAutenticate(){
    var userName = localStorage.getItem('userName')
    if(userName ===null)
         return false
         else return true;
  }
}
