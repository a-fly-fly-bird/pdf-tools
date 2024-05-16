import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  standalone: true,
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  boards: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // this.boards = this.boardService.getBoards();
  }
}
