import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private socket = io('http://localhost:3000')
  constructor(
  ) { }

  joinRoom(data){
    this.socket.emit('join',data)
  }
  createRoom(data){
    this.socket.emit('createRoom',data)
  }
  doMove(data){
    this.socket.emit('doMove',data)
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
    return observable
  }
}

