import { Component, OnInit } from '@angular/core';
import { RulesService } from '../../servicios/rules/rules.service';
import { AuthService } from '../../servicios/auth.service';
import { MatchService } from '../../servicios/match/match.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';import { Input } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  list: Array<any>;
  list2: Array<any>;
  private userUid:string
  private userName:string
  constructor(private rulesService: RulesService,
    public authService: AuthService,
    private matchService: MatchService,
    private router:Router) {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.userUid=auth.uid;
        this.userName=auth.displayName
        this.getMatches();
      }
    });
    //get del array de partidas disponibles
    //get del array de partidas jugando
    this.router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationStart) {
          // Show loading indicator
          //this.getMatches();
      }

      if (event instanceof NavigationEnd) {
          //this.getMatches();
          // Hide loading indicator
      }
      if (event instanceof NavigationError) {
          // Hide loading indicator
          // Present error to user
          console.log(event.error);
      }
  });
   }
  
  ngOnInit() {
  }
  getMatches(){
    this.rulesService.getAllOnlineRooms({userUid:this.userUid}).subscribe(res=>{
      let aux = res.json()
      this.list=aux.rooms
      //console.log(this.list+"....."+this.list.length)
    })
    this.rulesService.getAllPlayingRooms({userUid:this.userUid}).subscribe(res=>{
      let aux = res.json()
      this.list2=aux.rooms
      //console.log(this.list+"....."+this.list.length)
    })
  }
  join(piece:any){
    this.matchService.checkJoinRoom({roomId:piece.roomId}).then(data=>{
      if(data!==3){
        if(data===1){
          this.rulesService.joinMatchPvPO({roomId:piece.roomId,player:{name:this.userName,uid:this.userUid}}).subscribe(res=>{
            this.matchService.joinRoom({roomId:piece.roomId})
            this.goRoom()
          })
        }
        else{//data es 2
            let auxMatrix2 = new Array(piece.data.tamanno);
            let auxMatrix = piece.data.matrix.split(",").map(Number);
            let cont=0
            for(var i =0;i<piece.data.tamanno;i++){
              auxMatrix2[i] = new Array(piece.data.tamanno);
              for(var j =0;j<piece.data.tamanno;j++){
                auxMatrix2[i][j]=auxMatrix[cont]
                cont++
              }
            }
            this.rulesService.joinMatchPvPO({roomId:piece.roomId,player:{name:this.userName,uid:this.userUid}}).subscribe(res=>{
              this.matchService.createRoom({roomId:piece.roomId,matrix:auxMatrix2,actualPlayer:{uid:piece.data.actPlayer.uid,piece:piece.data.actPlayer.piece}})
              this.goRoom() 
            })
        }  
      }
        else{
          //this.flashMensaje.show('Error al ingresar a la sala: '+this.roomId+'. Sala llena',{cssClass: 'alert-danger', timeout: 4000});
        }
    })
      
  }
  joinPlaying(piece:any){
    this.matchService.checkJoinRoom({roomId:piece.roomId}).then(data=>{
      if(data!==3){
        if(data===1){
            this.matchService.joinRoom({roomId:piece.roomId})
        }
        else{//data es 2
            let auxMatrix2 = new Array(piece.data.tamanno);
            let auxMatrix = piece.data.matrix.split(",").map(Number);
            let cont=0
            for(var i =0;i<piece.data.tamanno;i++){
              auxMatrix2[i] = new Array(piece.data.tamanno);
              for(var j =0;j<piece.data.tamanno;j++){
                auxMatrix2[i][j]=auxMatrix[cont]
                cont++
              }
            }
              this.matchService.createRoom({roomId:piece.roomId,matrix:auxMatrix2,actualPlayer:{uid:piece.data.actPlayer.uid,piece:piece.data.actPlayer.piece}})
        }
        this.goRoom()  
      }
        else{
          //this.flashMensaje.show('Error al ingresar a la sala: '+this.roomId+'. Sala llena',{cssClass: 'alert-danger', timeout: 4000});
        }
    })
      
  }
  goRoom(){
    let items= ['game'];
    /*if(this.roomId!== undefined)
        items.push(this.roomId);*/
    this.router.navigate(items)
  }
}
