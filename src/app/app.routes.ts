import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'tabs',
        children: [
          {
            path: 'tab1',
            loadComponent: () => import('./tab1/tab1.page').then(m => m.Tab1Page)
          },
          {
            path: 'tab2',
            loadComponent: () => import('./tab2/tab2.page').then(m => m.Tab2Page)
          },
          {
            path: '',
            redirectTo: '/tabs/tab1',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'covid-detail',
    loadComponent: () => import('./pages/covid-detail/covid-detail.page').then(m => m.CovidDetailPage)
  },
  {
    path: 'covid-detail/:id',
    loadComponent: () => import('./pages/covid-detail/covid-detail.page').then(m => m.CovidDetailPage)
  }
]; 