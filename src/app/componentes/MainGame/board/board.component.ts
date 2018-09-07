import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';
import { RulesService } from '../../../servicios/rules/rules.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board: Array<any>;
  @Input() playerActualMethod: Function;
  constructor( private rulesService: RulesService
  ) {}

  ngOnInit() {
    //alert("game started");
  }
  piecePosition(i,j){
      let posiciones = {matrix:this.board,posX:i,posY:j}
      this.rulesService.tryMove(posiciones).subscribe(res=>{
        this.board=res.json() as Array<any>;
        this.playerActualMethod()
      })

  }
}
