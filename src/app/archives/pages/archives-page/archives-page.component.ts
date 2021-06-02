import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeaderResult } from 'src/app/leaderboards/interfaces/leaderboards.interfaces';
import { LeaderboardsService } from 'src/app/leaderboards/services/leaderboards.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-archives-page',
  templateUrl: './archives-page.component.html',
  styleUrls: ['./archives-page.component.scss']
})
export class ArchivesPageComponent implements OnInit {

  region: string = 'eu';
  season!: number;
  bracket: string = '';
  leaderboard!: LeaderResult;
  url: string = '';
  environment = environment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leaderboardsService: LeaderboardsService,
    private spinner: NgxSpinnerService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.bracket = params['bracket'];
      this.season = parseInt(params['season']);
      if (this.bracket.includes('f=')) {
        const arrayparams = this.bracket.split('f=');
        this.bracket = arrayparams[0];
      }
      if (this.bracket !== '2v2' && this.bracket !== '3v3' && this.bracket !== 'rbg') { this.bracket = '3v3' }
      this.url = environment.apiUrl 
        + '/pvp-entry-' + this.bracket
        + '/?season__sid=' + this.season
        + '&region__name=' + this.region
        + '&page=1'
        + '&ordering=rank'
      ;
      this.leaderboardsService.getLeaderboard(this.url)
        .subscribe(resp => {
          this.leaderboard = resp;
          this.titleService.setTitle('Murlocmate | WoW PvP Season ' + this.season + ' Archive')
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
        + '/?season__sid=' + this.season
        + '&region__name=' + this.region
        + '&page=1'
        + '&ordering=rank'
    ;
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.leaderboard = resp;
        this.router.navigateByUrl(`/archives/${this.season}/${value}`)
        this.spinner.hide();
      })
  }

}
