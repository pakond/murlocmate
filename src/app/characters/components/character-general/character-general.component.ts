import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Character } from '../../interfaces/characters.interfaces';
import { CharactersService } from '../../services/characters.service';
import { SharedService } from '../../../shared/services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-character-general',
  templateUrl: './character-general.component.html',
  styleUrls: ['./character-general.component.scss']
})
export class CharacterGeneralComponent implements OnChanges, OnInit {

  tiempo: string = ''
  interval: any;
  update: boolean = false;

  @Input() character!: Character

  constructor(
    private charactersService: CharactersService, 
    private sharedService: SharedService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.updateButton();
  }
  
  ngOnChanges() {
    this.updateButton();
    clearInterval(this.interval);
    this.utcTime();
  }

  utcTime(): void {
    let fecha = new Date(this.character.last_update);
    this.interval = setInterval(() => {
      const fechaActual = new Date()
      this.tiempo = this.sharedService.calculaTiempo(fecha, fechaActual);
      this.updateButton()
    }, 1000);
  }

  updateButton() {
    const old = new Date(this.character.last_update);
    const diff = Date.now() - Date.parse(old.toString());
    if (diff >= 60000) {
      this.update = true;
    }
  }

  updateCharacter() {
    this.spinner.show()
    this.charactersService.postCharacter(this.character.name, this.character.realm.slug!, this.character.region.name)
      .subscribe(
        resp => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigateByUrl(`/character/${this.character.region.name}/${this.character.realm.slug}/${this.character.name}`));
          this.spinner.hide()
        },
        err => {
          console.log(err)
          this.spinner.hide()
        });
  }
}
