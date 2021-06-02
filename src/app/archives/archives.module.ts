import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivesPageComponent } from './pages/archives-page/archives-page.component';
import { ArchivesRoutingModule } from './archives-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CutoffsModule } from '../cutoffs/cutoffs.module';
import { LeaderboardsModule } from '../leaderboards/leaderboards.module';



@NgModule({
  declarations: [
    ArchivesPageComponent
  ],
  imports: [
    CommonModule,
    ArchivesRoutingModule,
    NgxSpinnerModule,
    CutoffsModule,
    LeaderboardsModule
  ]
})
export class ArchivesModule { }
