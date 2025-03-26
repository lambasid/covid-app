import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CovidDetailPage } from './covid-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CovidDetailPage
  },
  {
    path: ':id',
    component: CovidDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CovidDetailPageRoutingModule {}
