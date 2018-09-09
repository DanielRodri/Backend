import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';
import { RulesService } from '../../../servicios/rules/rules.service'
import { MatchService } from '../../../servicios/match/match.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board: Array<any>;
  constructor( private rulesService: RulesService, private matchService:MatchService
  ) {}

  ngOnInit() {
    //alert("game started");
  }
  piecePosition(i,j){
    /*
    this.rulesService.getActualPlayer().subscribe(res=>{
      let player = res.json() as string;
    });
      let posiciones = {matrix:this.board,posX:i,posY:j}
      this.rulesService.tryMove(posiciones).subscribe(res=>{
        this.matchService.doMove(res.json() as Array<any>);
        //this.playerActualMethod()
      })
      */
  }
}
