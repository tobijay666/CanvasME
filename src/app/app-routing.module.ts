import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './Home/home/home.component';
import { RoomComponent } from './room/room.component';
import { AuthGuard } from './auth/auth.guard';
import { PlayComponent } from './Play/play/play.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'Room', component: RoomComponent, canActivate:[AuthGuard]
  },
  {
    path: 'Contact', component: ContactUsComponent,
  },
  {
    path: 'auth/login', component: LoginComponent,
  },
  {
    path: 'auth/signup', component: SignUpComponent,
  },
  {
    path: 'play', component: PlayComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
