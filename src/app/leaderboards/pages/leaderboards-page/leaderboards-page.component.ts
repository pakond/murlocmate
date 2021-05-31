import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { LeaderResult } from '../../interfaces/leaderboards.interfaces';
import { LeaderboardsService } from '../../services/leaderboards.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-leaderboards-page',
  templateUrl: './leaderboards-page.component.html',
  styleUrls: ['./leaderboards-page.component.scss']
})
export class LeaderboardsPageComponent implements OnInit {

  bracket: string = '';
  region: string = 'eu';
  leaderboard!: LeaderResult;
  url: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaderboardsService: LeaderboardsService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.bracket = params['bracket'];
      if (this.bracket.includes('f=')) {
        const arrayparams = this.bracket.split('f=');
        this.bracket = arrayparams[0];
      }
      if (this.bracket !== '2v2' && this.bracket !== '3v3' && this.bracket !== 'rbg') { this.bracket = '3v3' }
      this.url = environment.apiUrl 
        + '/pvp-entry-' + this.bracket
        + '/?season__sid=' + environment.currentSeason
        + '&region__name=' + this.region
        + '&page=1'
        + '&ordering=rank'
      ;
      this.leaderboardsService.getLeaderboard(this.url)
        .subscribe(resp => {
          this.leaderboard = resp;
          this.spinner.hide();
        })
    })
    
  }

  refreshLeaderboard(event: any): void {
    this.leaderboard = event.leaderboard;
    this.url = event.url;
  }

  changeBracket(value: string) {
    this.spinner.show();
    this.url = environment.apiUrl 
        + '/pvp-entry-' + value
        + '/?season__sid=' + environment.currentSeason
        + '&region__name=' + this.region
        + '&page=1'
        + '&ordering=rank'
    ;
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.leaderboard = resp;
        this.router.navigateByUrl(`/leaderboards/${value}`)
        this.spinner.hide();
      })
  }
}
