import { Component, OnInit, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';
import { RulesService } from '../../../servicios/rules/rules.service'
import { MatchService } from '../../../servicios/match/match.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() board: Array<any>;
  @Input() user:any
  @Input() user2:any
  @Input() actualPlayer:any
  @Input() roomId:any
  @Input() difficulty:any
  constructor( private rulesService: RulesService,
     private matchService:MatchService,
     public flashMensaje: FlashMessagesService
  ) {}

  ngOnInit() {
    //alert("game started");
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['actualPlayer']){
      if(this.actualPlayer!==undefined)
        if(this.actualPlayer.uid==='Computer'){
        this.piecePosition(1,1)
      }
    }
  }
  piecePosition(i,j){
    if(this.actualPlayer!== undefined&&this.board!==undefined){
      if(this.actualPlayer.uid==='Computer'){
        let posiciones = {matrix:this.board,posX:i,posY:j,actualPlayer:this.actualPlayer.piece,difficulty:this.difficulty,computer:1}
        this.rulesService.tryMove(posiciones).subscribe(res=>{
          let aux = res.json();  
          if(aux.validate){
            let auxActualPlayer={piece:this.user.piece,uid:this.user.uid}
            
              this.rulesService.getPuntaje({matrix:aux.matrix}).subscribe(points=>{
                this.matchService.doMove({matrix:aux.matrix,actualPlayer:auxActualPlayer,roomId:this.roomId,points:points.json()})
              })
              this.rulesService.updateMatch({roomId:this.roomId,actualPlayer:auxActualPlayer,matrix:aux.matrix}).subscribe(res=>{
            });
          }
          else{
            console.log("no hubo cambio")
          }
          
          //this.piecePosition(1,1);
        });
      }
      else if (this.actualPlayer.uid===this.user.uid&&this.actualPlayer.piece!==0){//pregunta si es el usuario el que esta jugando
        let posiciones = {matrix:this.board,posX:i,posY:j,actualPlayer:this.actualPlayer.piece,difficulty:null,computer:null}
        this.rulesService.tryMove(posiciones).subscribe(res=>{
          let aux = res.json();
          if(aux.validate){//pregunta si hubo un cambio
            let auxActualPlayer:any
            if(this.user.uid===this.user2.uid){//local
              if(this.user.piece===this.actualPlayer.piece){//si jugó piece 1
                auxActualPlayer={piece:this.user2.piece,uid:this.user2.uid}
              }
              else{//si jugó piece2
                auxActualPlayer={piece:this.user.piece,uid:this.user.uid}
              }
            }
            else{//Online or PVE
              auxActualPlayer={piece:this.user2.piece,uid:this.user2.uid}
            }
            //Esta linea es para cambiar de una vez en vez de esperar la respuesta, el problema es q lo recibe dos veces entonces ya que no se puede detener la respuesta
            //this.board=aux.matrix;
            
              this.rulesService.getPuntaje({matrix:aux.matrix}).subscribe(points=>{
                //console.log(points.json())
                this.matchService.doMove({matrix:aux.matrix,actualPlayer:auxActualPlayer,roomId:this.roomId,points:points.json()})
              })
              this.rulesService.updateMatch({roomId:this.roomId,actualPlayer:auxActualPlayer,matrix:aux.matrix}).subscribe(res=>{
            });
            
          }
          else{//No hubo cambio, Movimiento invalido
            console.log("no hubo cambio")
          }
        })
      }
      else{
        //this.flashMensaje.show('Debe esperar la conección del Player2',{cssClass: 'alert-danger', timeout: 4000});
        console.log("juega el otro")
      }
    
  }
  else{
    console.log("hay algo undefined")
  }
  }
}
