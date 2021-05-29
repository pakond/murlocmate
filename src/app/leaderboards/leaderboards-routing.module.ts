import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardsPageComponent } from './pages/leaderboards-page/leaderboards-page.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderboardsPageComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class LeaderboardsRoutingModule { }
