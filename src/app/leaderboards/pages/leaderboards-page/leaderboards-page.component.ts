import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { LeaderResult } from '../../interfaces/leaderboards.interfaces';
import { LeaderboardsService } from '../../services/leaderboards.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leaderboards-page',
  templateUrl: './leaderboards-page.component.html',
  styleUrls: ['./leaderboards-page.component.scss']
})
export class LeaderboardsPageComponent implements OnInit {

  bracket: string = '';
  region: string = 'eu';
  leaderboard!: LeaderResult;
  numeroPaginas: number = 0;
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaderboardsService: LeaderboardsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.bracket = params['bracket'];
      if (this.bracket !== '2v2' && this.bracket !== '3v3' && this.bracket !== 'rbg') { this.bracket = '3v3' }
      this.leaderboardsService.getLeaderboard(this.bracket, environment.currentSeason, this.region, this.currentPage)
        .subscribe(resp => {
          this.leaderboard = resp;
          this.numeroPaginas = Math.ceil(this.leaderboard.count / 100)
          this.spinner.hide();
        })
    })
    
  }

  refreshLeaderboard(event: LeaderResult): void {
    this.leaderboard = event;
    this.numeroPaginas = Math.ceil(this.leaderboard.count / 100)
  }

  page(event: number): void {
    this.currentPage = event;
  }

  changeBracket(value: string) {
    this.spinner.show();
    this.currentPage = 1;
    this.leaderboardsService.getLeaderboard(value, environment.currentSeason, this.region, this.currentPage)
      .subscribe(resp => {
        this.leaderboard = resp;
        this.numeroPaginas = Math.ceil(this.leaderboard.count / 100)
        this.bracket = value;
        this.router.navigateByUrl(`/leaderboards/${value}`)
        this.spinner.hide();
      })
  }
}
