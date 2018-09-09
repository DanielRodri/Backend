import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  private API_URL = '/api/game';
  //matrix:Array<any>

  constructor(private http: Http) {
    
   }
   tryMove(posicion: any) {
    return this.http.put('https://othello-027.herokuapp.com'+this.API_URL+'/rules'+'/'+posicion.posX+'/'+posicion.posY, posicion);
  }
  getMatrix(){
    return this.http.get('https://othello-027.herokuapp.com'+this.API_URL+'/getMatrix');
  }
  Users(id: any){
    return this.http.put('https://othello-027.herokuapp.com'+this.API_URL+'/Users/id',id);
  }
  createMatchPvPL(size: any){
    return this.http.post('https://othello-027.herokuapp.com'+this.API_URL+'/createMatchPvPL',size);
  }
  createMatchPvPO(size: any){
    return this.http.post('https://othello-027.herokuapp.com'+this.API_URL+'/createMatchPvPO',size);
  }
  createMatchPvE(size: any){
    return this.http.post('https://othello-027.herokuapp.com'+this.API_URL+'/createMatchPvE',size);
  }
  joinMatchPvPO(roomId: any){
    return this.http.put('https://othello-027.herokuapp.com'+this.API_URL+'/joinMatchPvPO',roomId);
  }
  getActualPlayer(){
    return this.http.get('https://othello-027.herokuapp.com'+this.API_URL+'/playerActual');
  }
  getPersonas(){
    return this.http.get('https://othello-027.herokuapp.com'+this.API_URL+'/getPersonas');
  }
  /*private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }*/
}