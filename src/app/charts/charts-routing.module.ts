import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexChartsPageComponent } from './pages/index-charts-page/index-charts-page.component';

const routes: Routes = [
  {
    path: '',
    component: IndexChartsPageComponent
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
export class ChartsRoutingModule { }
