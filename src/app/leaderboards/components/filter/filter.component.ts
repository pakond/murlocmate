import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchRealms, Spec, WowClass } from 'src/app/shared/interfaces/shared.interfaces';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LeaderResult } from '../../interfaces/leaderboards.interfaces';
import { LeaderboardsService } from '../../services/leaderboards.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  clases: WowClass[];
  specs: Spec[];
  realms: SearchRealms[];
  countries = [
    'English',
    'French',
    'German',
    'Italian',
    'Russian',
    'Spanish'
  ]

  @Input() leaderboard!: LeaderResult;
  @Input() bracket!: string;
  @Input() region!: string;
  @Input() currentPage!: number;

  @Output() newLeaderboardEvent = new EventEmitter<any>();

  constructor(
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private leaderboardsService: LeaderboardsService
  ) { 
    this.clases = sharedService.getClases;
    this.specs = sharedService.getSpecs;
    this.realms = this.sharedService.realms.sort((a, b) => a.slug.localeCompare(b.slug));;
  }

  ngOnInit(): void {
  }

  getClassSpecs(wowClassId: number) {
    return this.specs.filter(spec => spec.wow_class === wowClassId)
  }

  filterFactions(faction: string) {
    console.log('current page', this.currentPage)
    this.spinner.show()
    this.leaderboardsService.getLeaderboard(this.bracket, environment.currentSeason, this.region, this.currentPage, faction)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit({ 'leaderboard': resp, 'page': 1 });
        this.spinner.hide();
    })
  }
}
