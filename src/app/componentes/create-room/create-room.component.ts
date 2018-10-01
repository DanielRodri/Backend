import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RulesService } from '../../servicios/rules/rules.service'
import { MatchService } from '../../servicios/match/match.service'
import { AuthService } from '../../servicios/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit, OnDestroy {

  private pieces:Array<String>
  private player1:any
  private player2:any
  private roomId:String
  private size:number
  private type:String
  private difficulty:String

  constructor(private rulesService: RulesService,
    private router:Router,
    private matchService: MatchService,
    public authService: AuthService,
    public flashMensaje: FlashMessagesService
  ) {
    this.pieces=["Koromon","Tsunomon","Tokomon","Chibimon","Motimon","Pyocomon","Tanemon"]
    this.player1={name:"",uid:"",piece:1,pieceImg:"Koromon"}
    this.player2={name:"",uid:"",piece:2,pieceImg:"Tsunomon"}
    this.roomId=""
    this.size = 6;
    this.type = 'PvPO';

    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.player1.name = auth.displayName;
        this.player1.uid=auth.uid;
      }
    });
   }
  ngOnDestroy() {
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
      this.rulesService.createMatchPvPO({size:this.size,player1:this.player1,player2:this.player2,actPlayer:{uid:this.player1.uid,piece:0}}).subscribe(res=>{
        this.roomId = res.json().id;
        this.matchService.createRoom({roomId:this.roomId,matrix:res.json().matrix,actualPlayer:{uid:this.player1.uid,piece:0,points:[2,2]}})
        this.goRoom()
        this.flashMensaje.show('Debe esperar la conección del Player2',{cssClass: 'alert-danger', timeout: 4000});
      })
    }
    else if(this.type === 'PvPL'){
      this.player2.uid=this.player1.uid
      this.rulesService.createMatchPvPL({size:this.size,player1:this.player1,player2:this.player2,actPlayer:{uid:this.player1.uid,piece:1}}).subscribe(res=>{
        //console.log("la crea")
        this.roomId = res.json().id;
        this.matchService.createRoom({roomId:this.roomId,matrix:res.json().matrix,actualPlayer:{uid:this.player1.uid,piece:1,points:[2,2]}})
        this.goRoom()
      })
    }
    else if(this.type === 'PvE'){
      this.rulesService.createMatchPvE({size:this.size,player1:this.player1,player2:this.player2,actPlayer:{uid:this.player1.uid,piece:1}}).subscribe(res=>{
        this.roomId = res.json().id;
        this.matchService.createRoom({roomId:this.roomId,matrix:res.json().matrix,actualPlayer:{uid:this.player1.uid,piece:1,points:[2,2]}})
        this.goRoom()
      })
    }
    else{
      console.log("algo pasó, error")
    }
  }
  joinRoom(){
    if(this.roomId!==undefined &&this.roomId!==""){
      this.rulesService.getMatch({roomId:this.roomId}).subscribe(res=>{
        let aux = res.json()
        if (aux!==null){
          this.matchService.checkJoinRoom({roomId:this.roomId}).then(data=>{
            if(data!==3){//Sala no existe o sala disponible
              if(aux.finished===false){//Partida aun no termina
                if(data===1){//partida disponible
                  if(aux.player1.uid!==this.player1.uid&&aux.player2.uid===""){//aun no entra el player 2
                    console.log("primera vez que entra")
                    this.rulesService.joinMatchPvPO({roomId:this.roomId,player:this.player1}).subscribe(res=>{
                      this.matchService.joinRoom({roomId:this.roomId})
                      this.goRoom()
                    });
                  }
                  else if(aux.player1.uid===this.player1.uid||aux.player2.uid===this.player1.uid){//Se es uno de los jugadores registrados
                    console.log("entro ya mas de una vez")
                    this.matchService.joinRoom({roomId:this.roomId})
                    this.goRoom()
                  }
                  else{//No se pertenece a esa sala y ya están registrados otros 2 players
                    this.flashMensaje.show('Error al ingresar a la sala: '+this.roomId+'. No se encuentra registrado en la partida',{cssClass: 'alert-danger', timeout: 4000});
                  }
                }
                else{//data=2 quiere decir que existe pero hay que crearla en cache denuevo
                  console.log("no existe, pero se va a crear XD")
                  var auxMatrix2 = new Array(aux.tamanno);
                  let auxMatrix = aux.matrix.split(",").map(Number);
                  let cont=0
                  for(var i =0;i<aux.tamanno;i++){
                    auxMatrix2[i] = new Array(aux.tamanno);
                    for(var j =0;j<aux.tamanno;j++){
                      auxMatrix2[i][j]=auxMatrix[cont]
                      cont++
                    }
                  }
                  this.matchService.createRoom({roomId:this.roomId,matrix:auxMatrix2,actualPlayer:{uid:aux.actPlayer.uid,piece:aux.actPlayer.piece}})
                  this.goRoom()
                }
              }
              else{//finished===true
                this.flashMensaje.show('Error al ingresar a la sala: '+this.roomId+'. Partida Terminada',{cssClass: 'alert-danger', timeout: 4000});
              }
            }
            else{//Sala llena, por lo que no pertenece a la misma
              //this.flashMensaje.show('Error al ingresar a la sala: '+this.roomId+'. Sala llena',{cssClass: 'alert-danger', timeout: 4000});
              this.flashMensaje.show('Error al ingresar a la sala: '+this.roomId+'. No se encuentra registrado en la partida',{cssClass: 'alert-danger', timeout: 4000});
            }
          })
            
        }
        else{//No existe la partida
          this.flashMensaje.show('Error al ingresar a la sala: '+this.roomId+'. No existe',{cssClass: 'alert-danger', timeout: 4000});
        }
      });
    }
  }
  putSize(size){
    this.size=size
  }
  putType(type){
    this.type=type
  }
  putDifficulty(name,difficulty){
    this.player2.name=name;
    this.difficulty=difficulty
    this.player2.uid='Computer'
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
