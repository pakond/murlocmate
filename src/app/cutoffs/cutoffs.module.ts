import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CutoffsPageComponent } from './pages/cutoffs-page/cutoffs-page.component';
import { CutoffsRoutingModule } from './cutoffs-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from '../shared/pipes/pipes.module';
import { CutoffsComponent } from './components/cutoffs/cutoffs.component';



@NgModule({
  declarations: [
    CutoffsPageComponent,
    CutoffsComponent
  ],
  imports: [
    CommonModule,
    CutoffsRoutingModule,
    NgxSpinnerModule,
    PipesModule
  ],
  exports: [
    CutoffsComponent
  ]
})
export class CutoffsModule { }
