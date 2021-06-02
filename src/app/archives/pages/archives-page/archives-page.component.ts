import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-archives-page',
  templateUrl: './archives-page.component.html',
  styleUrls: ['./archives-page.component.scss']
})
export class ArchivesPageComponent implements OnInit {

  region: string = 'eu';
  season!: number;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.season = parseInt(params['season']);
    });
  }

}
