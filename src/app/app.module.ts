import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './componentes/home-page/home-page.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RegisterPageComponent } from './componentes/register-page/register-page.component';
import { LoginPageComponent } from './componentes/login-page/login-page.component';
import { PrivadoPageComponent } from './componentes/privado-page/privado-page.component';
import { NotFoundPageComponent } from './componentes/not-found-page/not-found-page.component';



import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';

import { initializeApp } from '../../node_modules/firebase/app';
import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from '../../node_modules/angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AuthService } from './servicios/auth.service';
import {environment} from '../environments/environment';

import {AuthGuard} from './guards/auth.guard';
import { BoardComponent } from './componentes/MainGame/board/board.component';
import { PieceComponent } from './componentes/MainGame/piece/piece.component';
import { GameComponent } from './componentes/MainGame/game/game.component';
import { RoomsComponent } from './componentes/rooms/rooms.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    RegisterPageComponent,
    LoginPageComponent,
    PrivadoPageComponent,
    NotFoundPageComponent,
    BoardComponent,
    PieceComponent,
    GameComponent,
    RoomsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FlashMessagesModule,
    AngularFirestoreModule,
    HttpModule,
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
