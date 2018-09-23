import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  list: Array<number> = [1, 2, 3,3,3,3,3,3,3,3,3,3];
  constructor() {
   }
  
  ngOnInit() {
  }
}
