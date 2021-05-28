import { Component, Input, OnInit } from '@angular/core';
import { ResizeService } from 'src/app/shared/services/resize.service';
import { LeaderResult } from '../../interfaces/leaderboards.interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  smallScreen: boolean;

  @Input() leaderboard!: LeaderResult;

  constructor(private resizeSvc: ResizeService) { 
    if (window.innerWidth > 768) {
      this.smallScreen = false;
    }
    else {
      this.smallScreen = true;
    }
    
  }

  ngOnInit(): void {
    this.resizeSvc.onResize$.subscribe(x => {
      if (x < 3) { this.smallScreen = true; }
      else { this.smallScreen = false; }
    });
  }

}
