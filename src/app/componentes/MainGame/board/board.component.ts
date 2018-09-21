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
    console.log("actualPlayer apenas da click es: "+this.actualPlayer.uid)
    if(this.actualPlayer!== undefined&&this.board!==undefined){
      if(this.actualPlayer.uid==='Computer'){
        console.log("computer")
      }
      else if (this.actualPlayer.uid===this.user.uid&&this.actualPlayer.piece!==0){//pregunta si es el usuario el que esta jugando
        console.log("se logro")
        console.log("antes de moverse, el actualPlayer es: "+this.actualPlayer.piece)
        let posiciones = {matrix:this.board,posX:i,posY:j,actualPlayer:this.actualPlayer.piece}
        console.log(posiciones)
        this.rulesService.tryMove(posiciones).subscribe(res=>{
          let aux = res.json();
          if(aux.validate){//pregunta si hubo un cambio
            console.log("gubo un cambio")
            console.log("matriz vieja: "+this.board)
            console.log("matriz nueva: "+aux.matrix)
            this.matchService.doMove({matrix:aux.matrix,actualPlayer:{piece:this.user2.piece,uid:this.user2.uid},roomId:this.roomId})
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
