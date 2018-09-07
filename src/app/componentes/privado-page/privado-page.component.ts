import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service';
import {FirestoreService} from '../../servicios/firestore/firestore.service';
@Component({
  selector: 'app-privado-page',
  templateUrl: './privado-page.component.html',
  styleUrls: ['./privado-page.component.scss']
})
export class PrivadoPageComponent implements OnInit {
  public nombreUsuario: string;
  public mensaje: string = "";
  public elemento: any
  public uid: any;
  constructor(
    public authService: AuthService,
    public fireStore: FirestoreService
  ) { 
    this.fireStore.cargarMensajes().subscribe(()=> {
      
      setTimeout (()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20);
      
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        
        this.nombreUsuario = auth.displayName;
        this.uid=auth.uid;
      }
    });
  }
  
  enviar_mensaje(){
    console.log(this.mensaje);
    if(this.mensaje.length===0){
      return;
    }
    this.fireStore.agregarMensaje(this.mensaje,this.nombreUsuario,this.uid)
          .then(()=> this.mensaje = "")
          .catch (()=>console.error('Error al enviar'));
  }


  
}
