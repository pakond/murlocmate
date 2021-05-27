import { Component, Input, OnInit } from '@angular/core';
import { LeaderResult } from '../../interfaces/leaderboards.interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() leaderboard!: LeaderResult;

  constructor() { }

  ngOnInit(): void {
  }

}
