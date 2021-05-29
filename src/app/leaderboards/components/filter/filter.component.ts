import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchRealms, Spec, WowClass } from 'src/app/shared/interfaces/shared.interfaces';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { LeaderResult } from '../../interfaces/leaderboards.interfaces';
import { LeaderboardsService } from '../../services/leaderboards.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterForm: FormGroup;

  clases: WowClass[];
  filteredClases: string[] = [];
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
  @Input() url!: string;
  @Input() bracket!: string;

  @Output() newLeaderboardEvent = new EventEmitter<any>();

  constructor(
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private leaderboardsService: LeaderboardsService
  ) { 
    this.clases = sharedService.getClases;
    this.specs = sharedService.getSpecs;
    this.realms = this.sharedService.getRealms.sort((a, b) => a.slug.localeCompare(b.slug));
    this.filterForm = this.fb.group({
      realm: new FormControl(''),
    })
    this.filterForm.get('realm')!.setValue('All')
  }

  ngOnInit() {
  }

  getClassSpecs(wowClassId: number) {
    return this.specs.filter(spec => spec.wow_class === wowClassId)
  }

  filter(value: string, term: string) {
    this.spinner.show();
    if (value === 'All') {
      if (this.url.includes(term)) {
        // BORRA DE LA URL EL TERMINO Y SU VALOR
        let value2 = this.url.split(term)[1];
        value2 = value2.split('&')[0];
        this.url = this.url.replace(term + value2, '');
      }
    }
    else {
      if (this.url.includes(term)) {
        // REMPLAZA DE LA URL EL VALOR DEL TERMINO
        let value2 = this.url.split(term)[1];
        value2 = value2.split('&')[0];
        this.url = this.url.replace(value2, value);
      } else {
        // AÑADE AL FINAL DE LA URL EL TERMINO Y VALOR
        this.url += term + value;
      }
    }
    this.resetPage();
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit({ 'leaderboard': resp, 'url': this.url });
        this.spinner.hide();
    })
  }

  filterCountry(value: string, term: string) {
    this.spinner.show();
    if (value === 'All') {
      this.realms = this.sharedService.getRealms.sort((a, b) => a.slug.localeCompare(b.slug));
      this.filterForm.get('realm')!.setValue('All')
      if (this.url.includes(term)) {
        // BORRA DE LA URL EL TERMINO Y SU VALOR
        let value2 = this.url.split(term)[1];
        value2 = value2.split('&')[0];
        this.url = this.url.replace(term + value2, '');
      }
    }
    else {
      this.realms = this.sharedService.getRealms.filter(realm => realm.category === value).sort((a, b) => a.slug.localeCompare(b.slug));
      if (this.url.includes('&character__realm__slug=')) {
        let value2 = this.url.split('&character__realm__slug=')[1];
        value2 = value2.split('&')[0];
        this.url = this.url.replace('&character__realm__slug=' + value2, '');
        this.filterForm.get('realm')!.setValue('All');
      }
      if (this.url.includes(term)) {    
        // REMPLAZA DE LA URL EL VALOR DEL TERMINO
        let value2 = this.url.split(term)[1];
        value2 = value2.split('&')[0];
        this.url = this.url.replace(value2, value);
      } else {
        // AÑADE AL FINAL DE LA URL EL TERMINO Y VALOR
        this.url += term + value;
      }
    }
    this.resetPage();
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit({ 'leaderboard': resp, 'url': this.url });
        this.spinner.hide();
    })
  }

  filterClass(value: string, term: string) {
    this.spinner.show();
    if (this.url.includes(term)) {
      if (this.filteredClases.includes(value)) {
        this.filteredClases = this.filteredClases.filter(function(valor){ 
          return valor !== value;
        });
        let imgClass = document.getElementById(value);
        imgClass!.classList.remove('class-filtered-style');
        imgClass!.classList.add('class-style');
        let value2 = this.url.split(term)[1];
        value2 = value2.split('&')[0];
        this.url = this.url.replace(term + value2, '');
      }
      else {
        let imgClass = document.getElementById(value);
        imgClass!.classList.add('class-filtered-style');
        this.filteredClases.push(value);
        let value2 = this.url.split(term)[1];
        value2 = value2.split('&')[0];
        let imgClass2 = document.getElementById(value2);
        imgClass2!.classList.remove('class-filtered-style');
        imgClass2!.classList.add('class-style');
        this.filteredClases = this.filteredClases.filter(function(valor){ 
          return valor !== value2;
        });
        this.url = this.url.replace(value2, value);
      }
    } 
    else {
      // AÑADE AL FINAL DE LA URL EL TERMINO Y VALOR
      this.filteredClases.push(value);
      let imgClass = document.getElementById(value);
      imgClass!.classList.add('class-filtered-style');
      this.url += term + value;
    }
    this.resetPage();
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit({ 'leaderboard': resp, 'url': this.url });
        this.spinner.hide();
    })
  }

  resetFilters() {
    this.spinner.show()
    this.url = environment.apiUrl 
        + '/pvp-entry-' + this.bracket
        + '/?season__sid=' + environment.currentSeason
        + '&region__name=eu'
        + '&page=1'
        + '&ordering=rank'
    ;
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit({ 'leaderboard': resp, 'url': this.url });
        this.spinner.hide();
    })
  }

  resetPage(): void {
    let page = this.url.split('&page=')[1];
    page = page.split('&')[0];
    this.url = this.url.replace('&page=' + page, '&page=1');
  }
}
