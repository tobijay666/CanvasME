import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]

})
export class LoginComponent implements OnInit {
  successMsg: boolean = false;
  serverErrorMsg!: string;

  constructor(public userService: UserService,  private router: Router) { }

  ngOnInit(): void {
    if (this.userService.isLogedIn()){
      this.router.navigateByUrl('');
    }
  }

  onSubmit(form: NgForm){
    this.userService.loginUser(form.value).subscribe(
      res=>{
        this.userService.setToken(res['data']);
        // console.log(res['data'],JSON.parse(atob(res['data'].split('.')[1])),Date.now() /1000,JSON.parse(atob(res['data'].split('.')[1])).exp, (Number(JSON.parse(atob(res['data'].split('.')[1])).exp) > Number(Date.now() /1000)))
        this.successMsg=true;
        setTimeout(()=> this.successMsg = false,5000);
        this.resetForm(form);
        this.router.navigateByUrl('');

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
