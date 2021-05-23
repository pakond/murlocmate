import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/characters.interfaces';
import { SharedService } from '../../../shared/services/shared.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-character-detail-page',
  templateUrl: './character-detail-page.component.html'
})
export class CharacterDetailPageComponent implements OnInit {

  name: string = '';
  realm: string = '';
  region: string = '';
  character!: Character;
  exists: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private sharedService: SharedService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.name = params['name'];
      this.realm = params['realm'];
      this.region = params['region'];

      this.charactersService.getCharacter(this.name, this.realm, this.region)
      .subscribe(
        resp => {
          this.character = resp;
          this.character.active_title = this.character.active_title?.replace('{name}', this.character.name);
          this.exists = true;
          this.charactersService.getRealm(this.character.realm.id).subscribe(
            resp => { 
              this.character.realm = resp
            });
        },
        err => {
          this.charactersService.postCharacter(this.name, this.realm, this.region)
            .subscribe(
              resp => {
                this.charactersService.getCharacter(this.name, this.realm, this.region)
                  .subscribe(
                    resp => { 
                      this.character = resp;
                      this.character.active_title = this.character.active_title?.replace('{name}', this.character.name);
                      this.exists = true;
                      this.charactersService.getRealm(this.character.realm.id).subscribe(
                        resp => { 
                          this.character.realm = resp
                        });
                    },
                    (err) => this.exists = false
                  )
              },
              (err) => this.exists = false
            )
        }
      );
    });
  }

  regionImg(name: string): string {
    return this.sharedService.regions.filter(region => region.name === name)[0].icon;

  }
}
