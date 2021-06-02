import { Component, OnInit } from '@angular/core';
import { LeaderResult } from 'src/app/leaderboards/interfaces/leaderboards.interfaces';
import { ChartsService } from '../../services/charts.service';

@Component({
  selector: 'app-index-charts-page',
  templateUrl: './index-charts-page.component.html',
  styleUrls: ['./index-charts-page.component.scss']
})
export class IndexChartsPageComponent implements OnInit {

  charts!: LeaderResult[];
  bracket: string = '';

  constructor(
    private chartsService: ChartsService
  ) { }

  ngOnInit(): void {
    if (this.bracket !== '2v2' && this.bracket !== '3v3' && this.bracket !== 'rbg') { this.bracket = '3v3' }

    this.chartsService.getCharts(this.bracket)
      .subscribe(resp => {
        
      });
  }

  changeBracket(value: string) {
    this.bracket = value;
    this.chartsService.getCharts(this.bracket)
      .subscribe(resp => {
        
      });
  }
}
