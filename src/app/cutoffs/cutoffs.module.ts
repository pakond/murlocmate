import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutoffsPageComponent } from './pages/cutoffs-page/cutoffs-page.component';
import { CutoffsRoutingModule } from './cutoffs-routing.module';



@NgModule({
  declarations: [
    CutoffsPageComponent
  ],
  imports: [
    CommonModule,
    CutoffsRoutingModule
  ]
})
export class CutoffsModule { }
