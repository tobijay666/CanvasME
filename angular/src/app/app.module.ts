import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { HomeComponent } from './Home/home/home.component';
import { HeaderComponent } from './Home/header/header.component';
import { FooterComponent } from './Home/footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CreateComponent } from './Play/create/create.component';
import { JoinComponent } from './Play/join/join.component';


import { AuthGuard } from './auth/auth.guard';
import { PlayComponent } from './Play/play/play.component';
import { SelectionComponent } from './Play/selection/selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule } from "@angular/material/button";
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';





@NgModule({
    declarations: [
        AppComponent,
        RoomComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        ContactUsComponent,
        LoginComponent,
        SignUpComponent,
        PlayComponent,
        SelectionComponent,
        CreateComponent,
        JoinComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatDividerModule
    ]
})
export class AppModule { }
