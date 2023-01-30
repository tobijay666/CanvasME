import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers:[UserService]
})
export class SignUpComponent implements OnInit {
  regexEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  successMsg: boolean = false;
  serverErrorMsg!: string;
  signUpForm: any;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm){
    this.userService.postUser(form.value).subscribe(
      res=>{
        this.successMsg=true;
        setTimeout(()=> this.successMsg = false,5000);
        this.resetForm(form);
        this.router.navigateByUrl('/auth/login');
      }
      ,err=>{
        if (err.status == 422){
          this.serverErrorMsg = err.error.join('<br>');
        }
      }
      );

  }

  resetForm(form:NgForm){
    this.userService.selectedUser = {
      uname:'',
      email:'',
      password:''
    };
    form.resetForm();
    this.serverErrorMsg='';
  }

}
