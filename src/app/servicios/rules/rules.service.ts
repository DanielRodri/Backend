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
    return this.http.put('http://localhost:3000'+this.API_URL+'/rules'+'/'+posicion.posX+'/'+posicion.posY, posicion);
  }
  getMatrix(){
    return this.http.get('http://localhost:3000'+this.API_URL+'/getMatrix');
  }
  getPlayers(){
    return this.http.get('http://localhost:3000'+this.API_URL+'/getPlayers');
  }
  createMatrix(size: any){
    return this.http.post('http://localhost:3000'+this.API_URL+'/createMatrix',size);
  }
  getActualPlayer(){
    return this.http.get('http://localhost:3000'+this.API_URL+'/playerActual');
  }
  getPersonas(){
    return this.http.get('http://localhost:3000'+this.API_URL+'/getPersonas');
  }
  /*private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }*/
}