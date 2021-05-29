import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeaderResult } from '../../interfaces/leaderboards.interfaces';
import { LeaderboardsService } from '../../services/leaderboards.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  currentPage!: number;
  numeroPaginas!: number;

  @Input() leaderboard!: LeaderResult;
  @Input() url!: string;

  @Output() newLeaderboardEvent = new EventEmitter<any>();

  constructor(
    private spinner: NgxSpinnerService, 
    private leaderboardsService: LeaderboardsService,
  ) { }

  ngOnChanges() {
    let page = this.url.split('&page=')[1]
    page = page.split('&')[0]
    this.currentPage = parseInt(page)
    this.numeroPaginas = Math.ceil(this.leaderboard.count / 100)
  }

  pagination(num: number) {
    this.spinner.show()
    this.url = this.url.replace('&page=' + this.currentPage, '&page=' + num);
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit({ 'leaderboard': resp, 'url': this.url });
        this.spinner.hide();
    })
  }
  
}
