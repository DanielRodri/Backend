import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RulesService } from '../../servicios/rules/rules.service'


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(private rulesService: RulesService,private router:Router) { }
  private player1={name:""}
  private player2={name:""}
  private size = 6;
  ngOnInit() {
  }
  goRoom(){
    let items= ['game'];
    this.router.navigate(items)

  }
  createRoom(){
    this.rulesService.createMatrix({size:this.size,player1:this.player1.name,player2:this.player2.name}).subscribe(res=>{
      this.goRoom()
      console.log(res)
    })
    //this.goRoom();
  }
  putSize(size){
    this.size=size
  }

}
