import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  //https://othello-027.herokuapp.com
  private socket = io('localhost:3000')
  constructor() 
  {
  }

  checkJoinRoom(data){
    this.socket.emit('checkJoinRoom',data)
    let observable = new Observable<any>(observer=>{
      //console.log("Crea un observer")
     
     this.socket.on('joinChannel',(data)=>{
        observer.next(data);
        //return data;
     });
     return () =>{this.socket.disconnect();}
   });
   return observable;
  }
  joinRoom(data){
  return this.socket.emit('joinRoom',data)
  }
  createRoom(data){
    return this.socket.emit('createRoom',data)
  }
  leaveRoom(data){
    return this.socket.emit('leaveRoom',data)
  }
  doMove(data){
    return this.socket.emit('doMove',data)
  }
  matrixReceived(){
    let observable = new Observable<any>(observer=>{
      this.socket.on('didMove',(data)=>{
         observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });
    return observable
  }
  playerReceived(){
    let observable = new Observable<any>(observer=>{
      this.socket.on('nextPlayer',(data)=>{
         observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });
    return observable
  }
  roomReceived(){
    let observable = new Observable<any>(observer=>{
      this.socket.on('roomId',(data)=>{
         observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });
    //console.log("servicio, observable prueba")
    return observable
  }
  availableMatches(){
    let observable = new Observable<any>(observer=>{
      this.socket.on('matches',(data)=>{
         observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });
    //console.log("servicio, observable prueba")
    return observable
  }
}

