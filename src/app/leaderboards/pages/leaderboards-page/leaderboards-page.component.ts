import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaderResult } from '../../interfaces/leaderboards.interfaces';
import { LeaderboardsService } from '../../services/leaderboards.service';

@Component({
  selector: 'app-leaderboards-page',
  templateUrl: './leaderboards-page.component.html',
  styleUrls: ['./leaderboards-page.component.scss']
})
export class LeaderboardsPageComponent implements OnInit {

  bracket: string = ''
  leaderboard!: LeaderResult;

  constructor(
    private route: ActivatedRoute,
    private leaderboardsService: LeaderboardsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bracket = params['bracket'];
      this.leaderboardsService.getLeaderboard(this.bracket, 30, 'eu', 0)
        .subscribe(resp => {
          this.leaderboard = resp;
          console.log(this.leaderboard)
        })
    })
  }

}
