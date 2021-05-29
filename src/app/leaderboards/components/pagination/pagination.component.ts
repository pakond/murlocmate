import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeaderResult } from '../../interfaces/leaderboards.interfaces';
import { LeaderboardsService } from '../../services/leaderboards.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() leaderboard!: LeaderResult;
  @Input() bracket!: string;
  @Input() region!: string;
  @Input() numeroPaginas!: number;
  @Input() currentPage!: number;

  @Output() newLeaderboardEvent = new EventEmitter<LeaderResult>();
  @Output() newCurrentPageEvent = new EventEmitter<number>();

  constructor(
    private spinner: NgxSpinnerService, 
    private leaderboardsService: LeaderboardsService,
  ) {}

  ngOnInit(): void {
  }

  pagination(num: number) {
    this.spinner.show()
    this.leaderboardsService.getLeaderboard(this.bracket, environment.currentSeason, this.region, num)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit(resp);
        this.newCurrentPageEvent.emit(num);
        this.spinner.hide();
    })
  }
  
}
