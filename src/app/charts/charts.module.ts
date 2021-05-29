import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexChartsPageComponent } from './pages/index-charts-page/index-charts-page.component';
import { ChartsRoutingModule } from './charts-routing.module';



@NgModule({
  declarations: [
    IndexChartsPageComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule
  ]
})
export class ChartsModule { }
