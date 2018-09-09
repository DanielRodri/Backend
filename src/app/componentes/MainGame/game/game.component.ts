import { Component, OnInit, OnChanges } from '@angular/core';
import { RulesService } from '../../../servicios/rules/rules.service'
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { NgOnChangesFeature } from '../../../../../node_modules/@angular/core/src/render3';
import {MatchService} from '../../../servicios/match/match.service'
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  public number: any;
  public isPlay: boolean;
  private matrix:Array<any>
  private actualPlayer:string
  private user:{name:string,uid:string,piece:any}
  private user2:{name:string,uid:string,priece:any}
  private type :string 
  private roomId:any

  constructor(private rulesService: RulesService,
  private matchService:MatchService,
  public authService: AuthService) {
    this.matchService.matrixReceived()
    .subscribe(data=>this.matrix=data)
    this.matchService.playerReceived()
    .subscribe(data=>this.actualPlayer=data)
    this.matchService.roomReceived()
    .subscribe(data=>{
    this.roomId=data
    })
  }
  


  /*TryMove(i,j){
    console.log('prueba antes de get '+this.roomId+', otra '+this.matrix)
    this.rulesService.Users(this.roomId).subscribe(res=>{
        let aux = res.json()
        this.type=aux.type;
        this.user=aux.player1
        this.user2=aux.player2
    })
    //this.prepareGame()
    if(this.matrix!==undefined){
      if(this.actualPlayer==='pc'){

      }
      else if (this.actualPlayer===this.user.name){
        let posiciones = {matrix:this.matrix,posX:i,posY:j,actualPlayer:this.actualPlayer}
      this.rulesService.tryMove(posiciones).subscribe(res=>{
        if(this.matrix!==res.json() as Array<any>){
          if(this.actualPlayer===this.player1){
            this.matchService.doMove({matrix:res.json() as Array<any>,actualPlayer:this.player2});
          }
          else
          this.matchService.doMove({matrix:res.json() as Array<any>,actualPlayer:this.player1});
        }
      })
      }
    }
  }*/

  ngOnChange(){

  }
  ngOnInit() {
    console.log("saliendo de aqui")
    
  }
  prepareGame(){
    /*this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.user.name = auth.displayName;
        this.user.uid=auth.uid;
      }
    });*/
    console.log('prueba antes de get '+this.roomId)
    this.rulesService.Users(this.roomId).subscribe(res=>{
        let aux = res.json()
        this.type=aux.type;
        this.user=aux.player1
        this.user2=aux.player2
    })
    //this.rulesService.getPlayers(this.roomId);
  }
  getMatrixSize(){
    return this.matrix.length;
  }
}