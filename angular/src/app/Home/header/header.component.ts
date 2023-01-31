import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[UserService]
})
export class HeaderComponent implements OnInit {
  logState!: boolean  ;


  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.isLogged();
    // this.userService.deleteToken();
    // console.log(this.userService.getToken());
  }

  isLogged(){
    this.logState = this.userService.isLogedIn();
    // console.log(this.logState);
    // return this.logState;

  }
  logout(){
    this.userService.deleteToken();
    this.logState = this.userService.isLogedIn();
    // console.log(this.logState);
    // console.log(this.userService.getToken());
    // this.logState = false;
  }

}
