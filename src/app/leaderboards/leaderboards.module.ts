import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardsPageComponent } from './pages/leaderboards-page/leaderboards-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LeaderboardsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LeaderboardsModule { }
