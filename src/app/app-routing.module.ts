import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexChartsPageComponent } from './charts/pages/index-charts-page/index-charts-page.component';
import { CutoffsPageComponent } from './cutoffs/pages/cutoffs-page/cutoffs-page.component';
import { ArchivesPageComponent } from './archives/pages/archives-page/archives-page.component';
import { LeaderboardsPageComponent } from './leaderboards/pages/leaderboards-page/leaderboards-page.component';
import { CharacterDetailPageComponent } from './characters/pages/character-detail-page/character-detail-page.component';

const routes: Routes = [
  { path: '', component: IndexChartsPageComponent },
  { path: 'cutoffs', component: CutoffsPageComponent },
  { path: 'charts', component: IndexChartsPageComponent },
  { path: 'archives/:season', component: ArchivesPageComponent },
  { path: 'leaderboards/:bracket', component: LeaderboardsPageComponent },
  { path: 'character/:region/:realm/:name', component: CharacterDetailPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
