import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import{Mensaje} from "../../interface/mensaje.interface";
import { getLocaleDayPeriods } from '../../../../node_modules/@angular/common';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  constructor(
    private firestore: AngularFirestore
  ) {}

  public cargarMensajes (){
    this.itemsCollection = this.firestore.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc').limit(5));
    
    return this.itemsCollection.valueChanges().map((mensajes: Mensaje[])=>{
       console.log(mensajes)
       this.chats = [];
       for(let mensaje of mensajes ){
         this.chats.unshift(mensaje);
       }
       return this.chats;
    })
  }
  public agregarMensaje(texto:string,nombre:string, userid: any){
    let mensaje: Mensaje ={
      nombre: nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid:userid
    }
    return this.itemsCollection.add(mensaje);
  }
}