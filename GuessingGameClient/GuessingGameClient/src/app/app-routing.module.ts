import { GameComponent } from './components/game/game.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RatingComponent } from './components/rating/rating.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'game',component:GameComponent,canActivate:[AuthGuard]},
  {path:'rating',component:RatingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
