import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { PipesModule } from '../shared/pipes/pipes.module';
import { LeaderboardsPageComponent } from './pages/leaderboards-page/leaderboards-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    LeaderboardsPageComponent,
    PaginationComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    PipesModule
  ]
})
export class LeaderboardsModule { }
