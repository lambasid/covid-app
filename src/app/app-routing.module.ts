import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'covid-detail',
    loadChildren: () => import('./pages/covid-detail/covid-detail.module').then(m => m.CovidDetailPageModule)
  },
  {
    path: 'covid-detail/:id',
    loadChildren: () => import('./pages/covid-detail/covid-detail.module').then(m => m.CovidDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
