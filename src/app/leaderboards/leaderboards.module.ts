import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { PipesModule } from '../shared/pipes/pipes.module';
import { LeaderboardsPageComponent } from './pages/leaderboards-page/leaderboards-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { LeaderboardsRoutingModule } from './leaderboards-routing.module';
import { FilterComponent } from './components/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LeaderboardsPageComponent,
    PaginationComponent,
    TableComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    LeaderboardsRoutingModule,
    PipesModule
  ]
})
export class LeaderboardsModule { }
