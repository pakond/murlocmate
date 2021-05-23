import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../interfaces/characters.interfaces';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-character-customization',
  templateUrl: './character-customization.component.html'
})
export class CharacterCustomizationComponent implements OnInit {

  environment = environment;

  @Input() character!: Character;

  constructor() { }

  ngOnInit(): void {
  }

}
