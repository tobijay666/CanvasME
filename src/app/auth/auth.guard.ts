import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService , private router: Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      // console.log(this.userService.isLogedIn());
      if(! this.userService.isLogedIn()){
        this.router.navigateByUrl('/auth/login');
        console.log("login failed");
        this.userService.deleteToken();
        return false;
      }
    else return true;
  }

}
