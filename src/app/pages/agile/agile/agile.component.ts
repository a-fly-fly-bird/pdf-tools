import { Component, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-agile',
  templateUrl: './agile.component.html',
  styleUrls: ['./agile.component.css'],
  standalone: true,
  imports: [SidebarComponent, BoardComponent],
})
export default class AgileComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
