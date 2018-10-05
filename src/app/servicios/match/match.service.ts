import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  //https://othello-027.herokuapp.com
  private socket;
  private url='https://othello-027.herokuapp.com';
  /*ob1:Observable<any>
  ob2:Observable<any>
  ob3:Observable<any>
  ob4:Observable<any>
  ob5:Observable<any>*/
  constructor() 
  {
    this.socket = io(this.url);
    console.log("se empezó un nuevo")
    //this.generateObservables();
  }
  
  checkJoinRoom(data){
   return new Promise(resolve=>{
    this.socket.emit('checkJoinRoom',data,function(res){
      resolve(res)
      //return res as number
    })
   })
   //return response
   //return this.ob1
  
  }
  disconnectSocket(){
    this.socket.disconnect()
    //this.socket = io('localhost:3000');
  }
  connectSocket(){

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
  matchObservable(){
    const observable = new Observable<any>(observer=>{
      this.socket.on('didMove',(data)=>{
         observer.next({data:data,evento:1});
      });
      this.socket.on('nextPlayer',(data)=>{
        observer.next({data:data,evento:2});
      });
      this.socket.on('roomId',(data)=>{
      observer.next({data:data,evento:3});
      });
      this.socket.on('points',(data)=>{
        observer.next({data:data,evento:4});
      });
      return () =>{this.socket.disconnect();}
    });
    return observable
    //return this.ob2
    
  }
  matrixReceived(){
    const observable = new Observable<any>(observer=>{
      this.socket.on('didMove',(data)=>{
         observer.next({data});
      });
      return () =>{this.socket.disconnect();}
    });
    return observable
    //return this.ob2
  }
  playerReceived(){
    const observable = new Observable<any>(observer=>{
      this.socket.on('nextPlayer',(data)=>{
         observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });
    return observable
    //return this.ob3
  }
  roomReceived(){
    const observable = new Observable<any>(observer=>{
      this.socket.on('roomId',(data)=>{
         observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });
    return observable
    //return this.ob4
  }
  pointsReceived(){
    const observable = new Observable<any>(observer=>{
      this.socket.on('points',(data)=>{
         observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });
    return observable
    //return this.ob5
  }
  availableMatches(){
    const observable = new Observable<any>(observer=>{
      this.socket.on('matches',(data)=>{
         observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });
    return observable
    //return this.ob5
  }
}

