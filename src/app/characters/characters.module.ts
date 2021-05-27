import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CharacterDetailPageComponent } from './pages/character-detail-page/character-detail-page.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { CharacterGeneralComponent } from './components/character-general/character-general.component';
import { CharacterRatingsComponent } from './components/character-ratings/character-ratings.component';
import { CharacterCustomizationComponent } from './components/character-customization/character-customization.component';
import { CharacterAchievementsComponent } from './components/character-achievements/character-achievements.component';
import { CharacterAltersComponent } from './components/character-alters/character-alters.component';
import { PipesModule } from '../shared/pipes/pipes.module';


@NgModule({
  declarations: [
    CharacterDetailPageComponent,
    InputSearchComponent,
    CharacterGeneralComponent,
    CharacterRatingsComponent,
    CharacterCustomizationComponent,
    CharacterAchievementsComponent,
    CharacterAltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxSpinnerModule,
    PipesModule
  ],
  exports: [
    InputSearchComponent,
  ]
})
export class CharactersModule { }
