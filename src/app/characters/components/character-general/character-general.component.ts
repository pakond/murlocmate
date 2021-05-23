import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { Character } from '../../interfaces/characters.interfaces';
import { CharactersService } from '../../services/characters.service';
// import { SharedService } from '../../../shared/services/shared.service';


@Component({
  selector: 'app-character-general',
  templateUrl: './character-general.component.html',
  styleUrls: ['./character-general.component.scss']
})
export class CharacterGeneralComponent implements OnChanges {

  tiempo: string = '';

  @Input() character!: Character

  constructor(
    private charactersService: CharactersService, 
    // private sharedService: SharedService,
    private router: Router,
    ) { }

  ngOnChanges() {
    // this.tiempo = this.sharedService.calculaTiempo(new Date(this.character.last_update), new Date())
    this.tiempo = moment(this.character.last_update).fromNow();
  }

  updateCharacter() {
    this.charactersService.postCharacter(this.character.name, this.character.realm.slug!, this.character.region.name)
      .subscribe(
        resp => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigateByUrl(`/character/${this.character.region.name}/${this.character.realm.slug}/${this.character.name}`));
        },
        err => console.log(err)
      );
  }
}
