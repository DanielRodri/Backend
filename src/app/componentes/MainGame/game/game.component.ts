import { Component, OnInit, OnChanges,OnDestroy } from '@angular/core';
import { RulesService } from '../../../servicios/rules/rules.service'
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';import { Input } from '@angular/core';
import { NgOnChangesFeature } from '../../../../../node_modules/@angular/core/src/render3';
import {MatchService} from '../../../servicios/match/match.service'
import { AuthService } from '../../../servicios/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy{
  private matrix:Array<any>
  private actualPlayer:{uid:string,piece:number}
  private user:{name:string,uid:string,piece:number,pieceImg:string}
  private user2:{name:string,uid:string,piece:number,pieceImg:string}
  private difficulty :number 
  private roomId:any
  private points={user:2,user2:2}
  private boardStyle:any
  private subscription: Subscription;
  private routerEvents:any

  constructor(private rulesService: RulesService,
              private matchService:MatchService,
              public authService: AuthService,
              public flashMensaje: FlashMessagesService,
              private router: Router
  /*private route: ActivatedRoute*/) {
    /*this.route.params.subscribe(params=>this.roomId=params['term'])*/
    this.subscription=new Subscription()

  }
  ngOnInit() {
    console.log("entroOnInit")
    //this.assignRouterEvents()
    this.assignObservers()
    
  }
  ngOnDestroy(){
    this.rulesService.updateMatch({roomId:this.roomId,actualPlayer:this.actualPlayer,matrix:this.matrix}).subscribe(res=>{});
    this.matchService.leaveRoom({roomId:this.roomId})
    //this.subscription?this.subscription.unsubscribe():null
    //this.subscription.unsubscribe();
  }
  assignObservers(){
    let observer1=this.matchService.matrixReceived()
    .subscribe(data=>{this.matrix=data})
    let observer2=this.matchService.playerReceived()
    .subscribe(data=>{
      //console.log("observer recibio: "+data)
      this.actualPlayer=data
      if(this.actualPlayer.piece!==0&&this.roomId!==undefined){
        this.prepareGame()
      }
    })
    let observer3=this.matchService.roomReceived()
    .subscribe(data=>{
    this.roomId=data
    this.prepareGame()
    })
    let observer4=this.matchService.pointsReceived()
    .subscribe(data=>{
      if(data!==null)
        this.putPoints(data)
    })
    this.subscription.add(observer1)
    this.subscription.add(observer2)
    this.subscription.add(observer3)
    this.subscription.add(observer4)
  }
  putPoints(data){
    if(this.user!==undefined){
      if(this.user.piece===1){
        this.points.user=data[0]
        this.points.user2=data[1]
      }
      else{
        this.points.user=data[1]
        this.points.user2=data[0]
      }
    }
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
            if(this.user2.uid==='Computer'){
              this.assignDifficulty()
            }
          }
          else{
            this.user2=aux.player1
            this.user=aux.player2
          }
        });
      }
    });
  }
  assignDifficulty(){
    if(this.user2.name==='LordWar'){
      this.difficulty=1
    }
    else if(this.user2.name==='AzaNT'){
      this.difficulty=2      
    }
    else{
      this.difficulty=3      
    }
  }
  getMatrixSize(){
    return this.matrix.length;
  }
  surrender(){
    this.rulesService.surrender({roomId:this.roomId,playerUid:this.user.uid}).subscribe(res=>{});
  }
}