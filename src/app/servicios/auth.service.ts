import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map'



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  loginFacebook(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginGoogle(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  registerUser(email: string, pass: string){
    return new Promise((resolve, reject)=> {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then (userData=> resolve(userData),
      err => reject (err)); 
    })
  }

  LoginEmail(email: string, pass: string){
    return new Promise((resolve, reject)=> {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then (userData=> resolve(userData),
      err => reject (err)); 
    });
  }

  getAuth(){
    return this.afAuth.authState.map (auth => auth);
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

  
}
