import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexChartsPageComponent } from './pages/index-charts-page/index-charts-page.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from '../shared/pipes/pipes.module';



@NgModule({
  declarations: [
    IndexChartsPageComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    NgxSpinnerModule,
    PipesModule
  ]
})
export class ChartsModule { }
