import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var userName = localStorage.getItem('userName');
      var userId = localStorage.getItem('userId');

      if(userId === null){
        this.router.navigate(['/']);
        return false;
      }
      else if((userName === null)){
        this.router.navigate(['/'])
        return false;
      }

      return true;
  }

}
