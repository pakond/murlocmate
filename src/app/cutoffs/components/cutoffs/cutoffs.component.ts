import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SeasonResults } from '../../interfaces/cutoffs.interfaces';
import { CutoffsService } from '../../services/cutoffs.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cutoffs',
  templateUrl: './cutoffs.component.html',
  styleUrls: ['./cutoffs.component.scss']
})
export class CutoffsComponent implements OnChanges {

  seasonData!: SeasonResults;
  duration!: number;

  @Input() season?: number;

  constructor(
    private cutoffsService: CutoffsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnChanges(): void {
    this.spinner.show();
    this.cutoffsService.getCutoff(this.season || environment.currentSeason)
      .subscribe(resp => {
        this.seasonData = resp;
        const d1 = new Date(this.seasonData.season_start_timestamp);
        let d2: Date;
        if (this.seasonData.season_end_timestamp) {
          d2 = new Date(this.seasonData.season_end_timestamp);
        } else {
          d2 = new Date();
        }
        this.duration = this.weeksBetween(d1.getTime(), d2.getTime())
        this.spinner.hide();
      });
  }

  weeksBetween(d1: number, d2: number) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
  }

}
