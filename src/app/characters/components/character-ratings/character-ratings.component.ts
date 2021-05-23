import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../interfaces/characters.interfaces';

@Component({
  selector: 'app-character-ratings',
  templateUrl: './character-ratings.component.html'
})
export class CharacterRatingsComponent implements OnInit {

  @Input() character!: Character;

  constructor() { }

  ngOnInit(): void {
  }

}
