import { Component, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {
  @Input() piece: any;
  constructor() { }

  ngOnInit() {
  }
}
