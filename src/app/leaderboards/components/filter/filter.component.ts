import { Location } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
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
export class FilterComponent implements OnChanges, AfterViewInit {

  filterForm: FormGroup;

  oldBracket: string;
  clases: WowClass[];
  filteredClases: number[] = [];
  filteredSpecs: number[] = [];
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
    private leaderboardsService: LeaderboardsService,
    private location: Location
  ) { 
    this.clases = sharedService.getClases;
    this.specs = sharedService.getSpecs;
    this.realms = this.sharedService.getRealms.sort((a, b) => a.slug.localeCompare(b.slug));
    this.filterForm = this.fb.group({
      faction: new FormControl(''),
      realm: new FormControl(''),
      countries: new FormControl('')
    })
    this.filterForm.get('faction')!.setValue('All')
    this.filterForm.get('realm')!.setValue('All')
    this.filterForm.get('countries')!.setValue('All')
    this.oldBracket = this.bracket;
  }

  ngOnChanges() {
    if (this.bracket !== this.oldBracket) {
      this.resetFilter();
      this.oldBracket = this.bracket;
    }
  }

  ngAfterViewInit() {
    if (this.location.path().includes('?filter=')) {
      this.applyFilters(decodeURIComponent(this.location.path().split('?filter=')[1]));
    }
  }

  // aplica los filtros de la url si hay
  applyFilters(filters: string): void {
    this.spinner.show();
    
    const filtros = filters.split('&');
    console.log(filtros)
    filtros.forEach(filtro=> {

      const filter: string[] = filtro.split('=');
      const value = filter[1];
      const key = filter[0];

      // filtro en faction
      if (key === 'character__faction__name') {
        this.filterForm.get('faction')!.setValue(value);
        this.url += '&' + key + '=' + value;
      }

      // filtro en reino
      if (key === 'character__realm__slug') {
        this.filterForm.get('realm')!.setValue(value);
        this.url += '&' + key + '=' + value;
      }

      // filtro en countries
      if (key === 'character__realm__category') {
        this.realms = this.sharedService.getRealms.filter(realm => realm.category === value).sort((a, b) => a.slug.localeCompare(b.slug));
        this.filterForm.get('countries')!.setValue(value);
        this.url += '&' + key + '=' + value;
      }

      // filtro en specs
      if (key === 'character__spec__id') {
        let imgSpec = document.getElementById('spec-' + value.toString());
        imgSpec!.classList.remove('spec-style');
        imgSpec!.classList.add('spec-filtered-style');
        this.filteredSpecs.push(parseInt(value));
        const wowClassId = this.sharedService.getSpecs.filter(spec => spec.id === parseInt(value))[0].wow_class
        const specs = this.sharedService.getSpecs.filter(spec => spec.wow_class === wowClassId)
        let contador: number = 1;
        specs.forEach(item => {
          if (this.filteredSpecs.includes(item.id)) { contador += 1 }
        })
        if (contador === specs.length) {
          let imgClass = document.getElementById('wow_class-' + wowClassId.toString());
          imgClass!.classList.remove('class-style');
          imgClass!.classList.add('class-filtered-style');
          this.filteredClases.push(wowClassId);
        }
        this.url += '&' + key + '=' + value;
      }
    });

    // llama a la api con los filtros
    this.resetPage();
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit({ 'leaderboard': resp, 'url': this.url });
        this.spinner.hide();
    })
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
        this.location.replaceState('/leaderboards/' + this.bracket + '?filter=' + this.url.split(environment.apiUrl + '/pvp-entry-' + this.bracket + '/?')[1]);
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
        this.location.replaceState('/leaderboards/' + this.bracket + '?filter=' + this.url.split(environment.apiUrl + '/pvp-entry-' + this.bracket + '/?')[1]);
        this.spinner.hide();
    })
  }

  filterClass(value: number, term: string) {
    this.spinner.show();
    if (this.url.includes(term)) {
      if (this.filteredClases.includes(value)) {
        // incluye el termino y el MISMO valor
        this.filteredClases = this.filteredClases.filter(function(valor){ 
          return valor !== value;
        });
        let imgClass = document.getElementById('wow_class-' + value.toString());
        imgClass!.classList.remove('class-filtered-style');
        imgClass!.classList.add('class-style');
        const specs = this.sharedService.getSpecs.filter(spec => spec.wow_class === value)
        specs.forEach(spec=> {
          this.filteredSpecs = this.filteredSpecs.filter(function(valor){ 
            return valor !== spec.id;
          });
          let imgSpec = document.getElementById('spec-' + spec.id.toString());
          imgSpec!.classList.remove('spec-filtered-style');
          imgSpec!.classList.add('spec-style');
          this.url = this.url.replace(term + spec.id, '');
        })

      }
      else {
        // incluye el termino y OTRO valor
        let imgClass = document.getElementById('wow_class-' + value.toString());
        imgClass!.classList.add('class-filtered-style');
        this.filteredClases.push(value);
        const specs = this.sharedService.getSpecs.filter(spec => spec.wow_class === value)
        specs.forEach(spec=> {
          let imgSpec = document.getElementById('spec-' + spec.id.toString());
          imgSpec!.classList.remove('spec-style');
          imgSpec!.classList.add('spec-filtered-style');
          this.filteredSpecs.push(spec.id)
          this.url += term + spec.id;
        })
      }
    } 
    else {
      // no incluye termino ni valor
      this.filteredClases.push(value);
      let imgClass = document.getElementById('wow_class-' + value.toString());
      imgClass!.classList.add('class-filtered-style');
      const specs = this.sharedService.getSpecs.filter(spec => spec.wow_class === value)
      specs.forEach(spec=> {
        let imgSpec = document.getElementById('spec-' + spec.id.toString());
        imgSpec!.classList.remove('spec-style');
        imgSpec!.classList.add('spec-filtered-style');
        this.filteredSpecs.push(spec.id)
        this.url += term + spec.id;
      })
    }
    this.resetPage();
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit({ 'leaderboard': resp, 'url': this.url });
        this.location.replaceState('/leaderboards/' + this.bracket + '?filter=' + this.url.split(environment.apiUrl + '/pvp-entry-' + this.bracket + '/?')[1]);
        this.spinner.hide();
    })
  }

  filterSpec(spec: number, wowClass: number, term: string) {
    this.spinner.show();
    if (this.url.includes(term)) {
      if (this.filteredSpecs.includes(spec)) {
        // incluye el termino y el MISMO valor
        this.filteredClases = this.filteredClases.filter(function(valor){ 
          return valor !== wowClass;
        });
        let imgClass = document.getElementById('wow_class-' + wowClass.toString());
        imgClass!.classList.remove('class-filtered-style');
        imgClass!.classList.add('class-style');
        this.filteredSpecs = this.filteredSpecs.filter(function(valor){ 
          return valor !== spec;
        });
        let imgSpec = document.getElementById('spec-' + spec.toString());
        imgSpec!.classList.remove('spec-filtered-style');
        imgSpec!.classList.add('spec-style');
        this.url = this.url.replace(term + spec, '');
      }
      else {
        // incluye el termino y OTRO valor
        const classSpecs = this.sharedService.getSpecs.filter(item => item.wow_class === wowClass);
        let contador: number = 1;
        classSpecs.forEach(item => {
          if (this.filteredSpecs.includes(item.id)) { contador += 1 }
        })
        if (contador === classSpecs.length) {
          // incluye las otras specs de la clase . Añadir la clase y spec a filtradas
          let imgSpec = document.getElementById('spec-' + spec.toString());
          imgSpec!.classList.remove('spec-style');
          imgSpec!.classList.add('spec-filtered-style');
          this.filteredSpecs.push(spec);
          this.url += term + spec;
          let imgClass = document.getElementById('wow_class-' + wowClass);
          imgClass!.classList.remove('class-style');
          imgClass!.classList.add('class-filtered-style');
          this.filteredClases.push(wowClass);
        }
        else {
          let imgSpec = document.getElementById('spec-' + spec.toString());
          imgSpec!.classList.remove('spec-style');
          imgSpec!.classList.add('spec-filtered-style');
          this.filteredSpecs.push(spec);
          this.url += term + spec;
        }
      }
    } 
    else {
      // no incluye termino ni valor
      this.filteredSpecs.push(spec);
      let imgSpec = document.getElementById('spec-' + spec.toString());
      imgSpec!.classList.remove('spec-style');
      imgSpec!.classList.add('spec-filtered-style');
      this.url += term + spec;
    }
    this.resetPage();
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit({ 'leaderboard': resp, 'url': this.url });
        this.location.replaceState('/leaderboards/' + this.bracket + '?filter=' + this.url.split(environment.apiUrl + '/pvp-entry-' + this.bracket + '/?')[1]);
        this.spinner.hide();
    })
  }

  resetFilter() {
    this.clases.forEach(wowClass => {
      let imgClass = document.getElementById('wow_class-' + wowClass.id.toString());
      imgClass?.classList.remove('class-filtered-style');
      imgClass?.classList.add('class-style');
    })
    this.filteredClases = [];
    this.specs.forEach(spec => {
      let imgClass = document.getElementById('spec-' + spec.id.toString());
      imgClass?.classList.remove('spec-filtered-style');
      imgClass?.classList.add('spec-style');
    })
    this.filteredSpecs = [];

    this.realms = this.sharedService.getRealms.sort((a, b) => a.slug.localeCompare(b.slug));
    this.filterForm.get('faction')!.setValue('All')
    this.filterForm.get('realm')!.setValue('All');
    this.filterForm.get('countries')!.setValue('All');
  }

  resetPage(): void {
    let page = this.url.split('&page=')[1];
    page = page.split('&')[0];
    this.url = this.url.replace('&page=' + page, '&page=1');
  }

  resetFiltersButton() {
    this.spinner.show()
    this.url = environment.apiUrl 
        + '/pvp-entry-' + this.bracket
        + '/?season__sid=' + environment.currentSeason
        + '&region__name=eu'
        + '&page=1'
        + '&ordering=rank'
    ;
    this.resetFilter();
    this.leaderboardsService.getLeaderboard(this.url)
      .subscribe(resp => {
        this.newLeaderboardEvent.emit({ 'leaderboard': resp, 'url': this.url });
        this.location.replaceState('/leaderboards/' + this.bracket);
        this.spinner.hide();
    })
  }
}
