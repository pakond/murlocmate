import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CutoffsPageComponent } from './pages/cutoffs-page/cutoffs-page.component';

const routes: Routes = [
  {
    path: '',
    component: CutoffsPageComponent
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
export class CutoffsRoutingModule { }
