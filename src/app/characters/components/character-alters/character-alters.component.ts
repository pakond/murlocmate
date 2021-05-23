import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../interfaces/characters.interfaces';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-character-alters',
  templateUrl: './character-alters.component.html'
})
export class CharacterAltersComponent implements OnInit {

  @Input() character!: Character;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  classColor(wowClass: string): string {
    return this.sharedService.getClases.filter(wClass => wClass.name === wowClass)[0].color!;
  }

  regionIcon(name: string): string {

    return this.sharedService.regions.filter(region => region.name === name)[0].icon;

  }

  classIcon(name: string): string {

    return this.sharedService.clases.filter(wowClass => wowClass.name === name)[0].icon!;

  }
}
