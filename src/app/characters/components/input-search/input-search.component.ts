import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CharactersService } from '../../services/characters.service';
import { SearchCharacters } from '../../interfaces/characters.interfaces';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  debouncer: Subject<string> = new Subject();

  term: string = '';
  suggest: SearchCharacters[] = [];
  noMostrar: boolean = false;
  mostrado: boolean = false;

  constructor(
    private characterService: CharactersService, 
    private router: Router,
    private sharedService: SharedService
  ) 
  { }

  ngOnInit(): void {

    this.debouncer
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
        value = value.toLowerCase().trim();
        this.characterService.searchCharacters(value).subscribe(resp => {
          if (resp.length === 0) {
            const lista = value.split('-');
            const name: string = lista[0];
            const realm: string = lista[1];
            const realms = this.sharedService.getRealms.filter(item => item.slug!.includes(realm || 'a'));

            let eu: number = 0;
            let us: number = 0;
            let kr: number = 0;
            let i: number = 0;
            while (realms.length > i && (eu+us+kr) < 12) {
              if (realms[i].region === 'eu' && eu < 4) {
                this.suggest.push({'name': name, 'realm': realms[i].slug, 'wow_class': '', 'region': realms[i].region, 'max_3v3_rating': 0, 'max_2v2_rating': 0 })
                eu++;
              } else if (realms[i].region === 'us' && us < 4) {
                this.suggest.push({'name': name, 'realm': realms[i].slug, 'wow_class': '', 'region': realms[i].region, 'max_3v3_rating': 0, 'max_2v2_rating': 0 })
                us++;
              } else if (realms[i].region === 'kr' && kr < 4) {
                this.suggest.push({'name': name, 'realm': realms[i].slug, 'wow_class': '', 'region': realms[i].region, 'max_3v3_rating': 0, 'max_2v2_rating': 0 })
                kr++;
              }
              i+=1
            }    
          } else {
            let eu: number = 0;
            let us: number = 0;
            let kr: number = 0;
            let i: number = 0;
            while (resp.length > i && (eu+us+kr) < 12) {
              if (resp[i].region === 'eu' && eu < 4) {
                eu++;
                this.suggest.push(resp[i]);
              } else if (resp[i].region === 'us' && us < 4) {
                us++;
                this.suggest.push(resp[i]);
              } else if (resp[i].region === 'kr' && kr < 4) {
                kr++;
                this.suggest.push(resp[i]);
              }
              i++;
            }
          }
          this.mostrado = true;
        });
    })

  }

  @HostListener('document:click')
  click() {
    if (this.mostrado === true) {
      this.noMostrar = true;
    }
  }

  keyUp(): void {

    this.suggest = []

    if (this.term.length > 1) {
      this.noMostrar = false;
      this.debouncer.next(this.term)
    }
 
  }

  goCharacter(character: SearchCharacters): void {
    this.term = character.name + '-' + character.realm
    this.router.navigateByUrl(`character/${character.region}/${character.realm}/${character.name}`)
  }

  search() {
    this.goCharacter(this.suggest[0])
  }

  regionImg(name: string): string {
    return this.sharedService.regions.filter(region => region.name === name)[0].icon;
  }

  classImg(name: string): string {
    return this.sharedService.clases.filter(wowClass => wowClass.name === name)[0].icon || '';
  }

  classColor(name: string): string {
    const color = this.sharedService.clases.filter(wowClass => wowClass.name === name)[0].color;
    return 'color: ' + color + ';';
  }

}
