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
  
}
