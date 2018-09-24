import { Component, OnInit, OnChanges } from '@angular/core';
import { RulesService } from '../../../servicios/rules/rules.service'
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';import { Input } from '@angular/core';
import { NgOnChangesFeature } from '../../../../../node_modules/@angular/core/src/render3';
import {MatchService} from '../../../servicios/match/match.service'
import { AuthService } from '../../../servicios/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  private matrix:Array<any>
  private actualPlayer:{uid:string,piece:number}
  private user:{name:string,uid:string,piece:number,pieceImg:string}
  private user2:{name:string,uid:string,piece:number,pieceImg:string}
  private type :string 
  private roomId:any
  private boardStyle:any

  constructor(private rulesService: RulesService,
  private matchService:MatchService,
  public authService: AuthService,
  public flashMensaje: FlashMessagesService,
  private router: Router
  /*private route: ActivatedRoute*/) {
    /*this.route.params.subscribe(params=>this.roomId=params['term'])*/
    this.router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationStart) {
          // Show loading indicator
          if(this.roomId!==undefined){//esto es para saber si está saliendo
            this.rulesService.updateMatch({roomId:this.roomId,actualPlayer:this.actualPlayer,matrix:this.matrix}).subscribe(res=>{});
            this.matchService.leaveRoom({roomId:this.roomId})
          }
          else{
            //console.log("Entrando de Room.....Cargando......")
          }
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
      }
      if (event instanceof NavigationError) {
          // Hide loading indicator
          // Present error to user
          console.log(event.error);
      }
  });
    this.matchService.matrixReceived()
    .subscribe(data=>{this.matrix=data})
    this.matchService.playerReceived()
    .subscribe(data=>{
      //console.log("observer recibio: "+data)
      this.actualPlayer=data
      if(this.actualPlayer.piece!==0&&this.roomId!==undefined){
        this.prepareGame()
      }
    })
    this.matchService.roomReceived()
    .subscribe(data=>{
    this.roomId=data
    this.prepareGame()
    })
  }
  ngOnInit() {
    
  }
  prepareGame(){
    this.boardStyle={'margin': '0',
      'padding': '0',
      'box-sizing': 'border-box',
      'display':'flex',
      'width':(this.getMatrixSize()*64).toString()+"px",
      'flex-wrap':'wrap'
    }
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.rulesService.getUsers({roomId:this.roomId}).subscribe(res=>{
          let aux = res.json()
          //console.log(aux)
          //this.type=aux.type;
          if(auth.uid===aux.player1.uid){
            this.user=aux.player1
            this.user2=aux.player2
          }
          else{
            this.user2=aux.player1
            this.user=aux.player2
          }
        });
      }
    });
    //this.rulesService.updateMatch({roomId:this.roomId,actualPlayer:this.actualPlayer,matrix:this.matrix});
  }
  getMatrixSize(){
    return this.matrix.length;
  }
  surrender(){
    this.rulesService.surrender({roomId:this.roomId,playerUid:this.user.uid}).subscribe(res=>{});
  }
}