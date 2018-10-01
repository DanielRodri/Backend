import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  //https://othello-027.herokuapp.com
  private socket;
  private url='http://localhost:3000';
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
  /*generateObservables(){
    this.ob1= new Observable<any>(observer=>{
      this.socket.on('joinChannel',(data)=>{
          observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });

    this.ob2 = new Observable<any>(observer=>{
      this.socket.on('didMove',(data)=>{
         observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });
    
    this.ob3= new Observable<any>(observer=>{
      this.socket.on('nextPlayer',(data)=>{
        observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });

    this.ob4 = new Observable<any>(observer=>{
      this.socket.on('roomId',(data)=>{
        observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });

    this.ob5 = new Observable<any>(observer=>{
      this.socket.on('matches',(data)=>{
        observer.next(data);
      });
      return () =>{this.socket.disconnect();}
    });
  }*/
  checkJoinRoom(data){/*
    this.socket.emit('checkJoinRoom',data)
    const observable = new Observable<any>(observer=>{
      //console.log("Crea un observer")
     
     this.socket.on('joinChannel',(data)=>{
        observer.next(data);
        //return data;
     });
     return () =>{this.socket.disconnect();}
   });
   return observable*/
   /*return new Promise(function(resolve,reject){
     
   })*/
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
  matrixReceived(){
    
    const observable = new Observable<any>(observer=>{
      this.socket.on('didMove',(data)=>{
         observer.next(data);
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
}

