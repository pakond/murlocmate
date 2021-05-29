import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/characters.interfaces';
import { SharedService } from '../../../shared/services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-character-detail-page',
  templateUrl: './character-detail-page.component.html'
})
export class CharacterDetailPageComponent implements OnInit {

  name: string = '';
  realm: string = '';
  region: string = '';
  regionImg: string = '';
  character!: Character;
  exists: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.name = params['name'];
      this.realm = params['realm'];
      this.region = params['region'];

      this.spinner.show();
      this.charactersService.getCharacter(this.name, this.realm, this.region)
      .subscribe(
        resp => {
          this.character = resp;
          this.character.active_title = this.character.active_title?.replace('{name}', this.character.name);
          this.exists = true;
          this.spinner.hide();
        },
        err => {
          this.spinner.show()
          this.charactersService.postCharacter(this.name, this.realm, this.region)
            .subscribe(
              resp => {
                this.spinner.hide();
                this.spinner.show();
                this.charactersService.getCharacter(this.name, this.realm, this.region)
                  .subscribe(
                    resp => { 
                      this.character = resp;
                      this.character.active_title = this.character.active_title?.replace('{name}', this.character.name);
                      this.exists = true;
                      this.spinner.hide();
                    },
                    (err) => { 
                      this.exists = false;
                      this.spinner.hide();
                    }
                  )
              },
              (err) => {
                this.exists = false;
                this.spinner.hide();
              }
            )
        }
      );
    });
    this.regionImg = this.sharedService.regions.filter(reg => reg.name === this.region)[0].icon;
  }
}
