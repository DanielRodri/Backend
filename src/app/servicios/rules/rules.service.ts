import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  private API_URL = 'http://localhost:3000/api/game';
  //matrix:Array<any>

  constructor(private http: Http) {
    
   }
   //https://othello-027.herokuapp.com/api/game
   tryMove(posicion: any) {
    return this.http.put(this.API_URL+'/rules'+'/'+posicion.posX+'/'+posicion.posY, posicion);
  }
  getMatrix(){
    return this.http.get(this.API_URL+'/getMatrix');
  }
  getUsers(id: any){
    return this.http.put(this.API_URL+'/getUsers/id',id);
  }
  getMatch(id: any){
    return this.http.put(this.API_URL+'/getMatch/id',id);
  }
  createMatchPvPL(size: any){
    return this.http.post(this.API_URL+'/createMatchPvPL',size);
  }
  createMatchPvPO(size: any){
    return this.http.post(this.API_URL+'/createMatchPvPO',size);
  }
  createMatchPvE(size: any){
    return this.http.post(this.API_URL+'/createMatchPvE',size);
  }
  joinMatchPvPO(roomId: any){
    return this.http.put(this.API_URL+'/joinMatchPvPO',roomId);
  }
  updateMatch(roomId: any){
    return this.http.put(this.API_URL+'/updateMatch/roomId',roomId);
  }
  surrender(roomId: any){
    return this.http.put(this.API_URL+'/surrender/roomId',roomId);
  }
  getActualPlayer(){
    return this.http.get(this.API_URL+'/playerActual');
  }
  getPersonas(){
    return this.http.get(this.API_URL+'/getPersonas');
  }
  getAllOnlineRooms(roomId:any){
    return this.http.put(this.API_URL+'/getAllOnlineRooms',roomId);
  }
  
  /*private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }*/
}