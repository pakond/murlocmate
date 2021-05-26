import { Component, Input, OnChanges } from '@angular/core';
import { Rating } from 'src/app/shared/interfaces/shared.interfaces';
import { Character } from '../../interfaces/characters.interfaces';

@Component({
  selector: 'app-character-ratings',
  templateUrl: './character-ratings.component.html'
})
export class CharacterRatingsComponent implements OnChanges {

  rating2v2?: Rating;
  rating3v3?: Rating;
  ratingRbg?: Rating;

  @Input() character!: Character;

  constructor() { }

  ngOnChanges(): void {
    this.setRatings();
  }

  setRatings(): void {
    this.rating2v2 = { rating: 0, won: 0, lost: 0, winratio: 0, played: 0, bracket: { id: 0, pvp_type: 'ARENA_2v2' } }
    this.rating3v3 = { rating: 0, won: 0, lost: 0, winratio: 0, played: 0, bracket: { id: 1, pvp_type: 'ARENA_3v3' } }
    this.ratingRbg = { rating: 0, won: 0, lost: 0, winratio: 0, played: 0, bracket: { id: 3, pvp_type: 'BATTLEGROUNDS' } }
    this.character.ratings?.forEach((rating) => {
      if (rating.bracket.pvp_type === 'ARENA_2v2') { this.rating2v2 = rating }
      else if (rating.bracket.pvp_type === 'ARENA_3v3') { this.rating3v3 = rating }
      else if (rating.bracket.pvp_type === 'BATTLEGROUNDS') { this.ratingRbg = rating }
    })
  }
}
