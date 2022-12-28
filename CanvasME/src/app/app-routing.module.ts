import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './Home/contact/contact.component';
import { HomeComponent } from './Home/home/home.component';
import { MainComponent } from './Play/main/main.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'auth/login',
    component:LoginComponent,
  },
  {
    path: 'auth/signup',
    component:SignupComponent
  },
  {
    path: 'contact',
    component:ContactComponent
  },
  {
    path: 'Play/main',
    component:MainComponent
  }

    // children: [
    //   {

    //   },
    //   {

      // }
    // ]

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
