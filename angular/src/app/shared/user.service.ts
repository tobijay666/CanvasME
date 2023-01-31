import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User={
    uname:'',
    email:'',
    password:''
  }
  constructor(private http:HttpClient) { }

  postUser(user:User){
    return this.http.post(environment.baseUrl+'users/register',user)
  }
  loginUser(user:User){
    return this.http.post(environment.baseUrl+'users/login',user)
  }


  setToken(token:string){
    localStorage.setItem('token',token);
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getPayload(){
    let token = localStorage.getItem('token');
    if(token){
      let userPayload = atob(token.split('.')[1]);
      // console.log(JSON.parse(userPayload));
      return JSON.parse(userPayload);
    }
    else
      return null

  }
  isLogedIn(){
    let payLoad = this.getPayload();
    if (payLoad){
      // console.log(payLoad.exp, Date.now() /1000);
      return (payLoad.exp > Date.now() /1000);
    }
    else
      return false
  }

}
