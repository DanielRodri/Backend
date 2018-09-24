import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';
import { RulesService } from '../../../servicios/rules/rules.service'
import { MatchService } from '../../../servicios/match/match.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board: Array<any>;
  @Input() user:any
  @Input() user2:any
  @Input() actualPlayer:any
  @Input() roomId:any
  constructor( private rulesService: RulesService,
     private matchService:MatchService,
     public flashMensaje: FlashMessagesService
  ) {}

  ngOnInit() {
    //alert("game started");
  }
  piecePosition(i,j){
    if(this.actualPlayer!== undefined&&this.board!==undefined){
      if(this.actualPlayer.uid==='Computer'){
        console.log("computer")
      }
      else if (this.actualPlayer.uid===this.user.uid&&this.actualPlayer.piece!==0){//pregunta si es el usuario el que esta jugando

        let posiciones = {matrix:this.board,posX:i,posY:j,actualPlayer:this.actualPlayer.piece}
        this.rulesService.tryMove(posiciones).subscribe(res=>{
          let aux = res.json();
          if(aux.validate){//pregunta si hubo un cambio

            if(this.user.uid===this.user2.uid){//local
              if(this.user.piece===this.actualPlayer.piece){
                this.matchService.doMove({matrix:aux.matrix,actualPlayer:{piece:this.user2.piece,uid:this.user2.uid},roomId:this.roomId})
              }
              else{
                this.matchService.doMove({matrix:aux.matrix,actualPlayer:{piece:this.user.piece,uid:this.user.uid},roomId:this.roomId})
              }
            }
            else{
              this.matchService.doMove({matrix:aux.matrix,actualPlayer:{piece:this.user2.piece,uid:this.user2.uid},roomId:this.roomId})
            }
          }
          else{
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
