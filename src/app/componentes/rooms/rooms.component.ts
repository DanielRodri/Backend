import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RulesService } from '../../servicios/rules/rules.service'
import { MatchService } from '../../servicios/match/match.service'
import { AuthService } from '../../servicios/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  private pieces=["Koromon","Tsunomon","Tokomon","Chibimon","Motimon","Pyocomon","Tanemon"]
  private player1={name:"",uid:"",piece:1,pieceImg:"Koromon"}
  private player2={name:"",uid:"",piece:2,pieceImg:"Tsunomon"}
  private roomId=""
  private size = 6;
  private type = 'PvPO';

  constructor(private rulesService: RulesService,
    private router:Router,
    private matchService: MatchService,
    public authService: AuthService,
    public flashMensaje: FlashMessagesService
  ) {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.player1.name = auth.displayName;
        this.player1.uid=auth.uid;
      }
    });
   }
  
  ngOnInit() {
  }
  goRoom(){
    let items= ['game'];
    /*if(this.roomId!== undefined)
        items.push(this.roomId);*/
    this.router.navigate(items)
  }
  createRoom(){
    
    if(this.type === 'PvPO'){
      this.rulesService.createMatchPvPO({size:this.size,player1:this.player1,player2:this.player2}).subscribe(res=>{
        this.roomId = res.json().id;
        this.matchService.createRoom({roomId:this.roomId,matrix:res.json().matrix,actualPlayer:{uid:this.player1.uid,piece:0}})
        this.goRoom()
        this.flashMensaje.show('Debe esperar la conección del Player2',{cssClass: 'alert-danger', timeout: 4000});
        console.log(res)
      })
    }
    else if(this.type === 'PvPL'){
      this.player2.uid=this.player1.uid
      this.rulesService.createMatchPvPL({size:this.size,player1:this.player1,player2:this.player2}).subscribe(res=>{
        this.matchService.createRoom({roomId:this.roomId,matrix:res.json().matrix,type:this.type})
        this.goRoom()
        console.log(res)
      })
    }
    else if(this.type === 'PvE'){
      this.rulesService.createMatchPvE({size:this.size,player1:this.player1,player2:this.player2}).subscribe(res=>{
        this.matchService.createRoom({roomId:this.roomId,matrix:res.json().matrix,type:this.type})
        this.goRoom()
        console.log(res)
      })
    }
    else{
      console.log("algo pasó, error")
    }
    //this.goRoom();
  }
  joinRoom(){
    this.matchService.checkJoinRoom({roomId:this.roomId}).subscribe(data=>{
      if(data===true){
        console.log("entro")
        this.rulesService.joinMatchPvPO({roomId:this.roomId,player:this.player1}).subscribe(res=>{
          this.matchService.joinRoom({roomId:this.roomId})
          this.goRoom()
          console.log(res)
        })
      }
      else{
        this.flashMensaje.show('Error al ingresar a la sala: '+this.roomId,{cssClass: 'alert-danger', timeout: 4000});
        console.log("no puede entrar")
      }
    });
  }
  putSize(size){
    this.size=size
  }
  putType(type){
    this.type=type
  }
  putPiece(nPlayer,piece){
    if(nPlayer===1){
      this.player1.pieceImg=piece
    }
    else{
      this.player2.pieceImg=piece
    }
  }

}
