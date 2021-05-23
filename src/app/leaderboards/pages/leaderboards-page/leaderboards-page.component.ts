import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leaderboards-page',
  templateUrl: './leaderboards-page.component.html'
})
export class LeaderboardsPageComponent implements OnInit {

  bracket: string = ''

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bracket = params['bracket'];
    })
  }

}
