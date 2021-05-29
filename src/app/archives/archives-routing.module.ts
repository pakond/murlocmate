import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivesPageComponent } from './pages/archives-page/archives-page.component';

const routes: Routes = [
  {
    path: '',
    component: ArchivesPageComponent
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
export class ArchivesRoutingModule { }
