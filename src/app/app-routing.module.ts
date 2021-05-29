import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexChartsPageComponent } from './charts/pages/index-charts-page/index-charts-page.component';
import { CharacterDetailPageComponent } from './characters/pages/character-detail-page/character-detail-page.component';

const routes: Routes = [
  { path: '', component: IndexChartsPageComponent },
  { path: 'cutoffs', loadChildren: () => import('./cutoffs/cutoffs.module').then( m => m.CutoffsModule) },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then( m => m.ChartsModule) },
  { path: 'archives/:season', loadChildren: () => import('./archives/archives.module').then( m => m.ArchivesModule) },
  { path: 'leaderboards/:bracket', loadChildren: () => import('./leaderboards/leaderboards.module').then( m => m.LeaderboardsModule) },
  { path: 'character/:region/:realm/:name', component: CharacterDetailPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
