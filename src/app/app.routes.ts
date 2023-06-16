import { Routes } from '@angular/router';
import { authGuard } from './auth/utils/auth.guard';
import { nonAuthGuard } from './auth/utils/non-auth.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadComponent: () => import('./auth/auth.page.component'),
        canMatch: [nonAuthGuard],
      },
      {
        path: '',
        loadComponent: () => import('./shell/shell.component'),

        canMatch: [authGuard],
        children: [
          {
            path: 'auctions',
            loadComponent: () => import('./features/auctions/auctions.page.component'),
          },
          {
            path: 'ngos',
            loadComponent: () => import('./features/ngo/ngo-list.page.component'),
          },
          {
            path: 'manage/offers',
            loadComponent: () => import('./features/offers/add-offer.page.component'),
          },
          {
            path: 'offers',
            loadComponent: () => import('./features/offers/offers-list.page.component'),
          },
          {
            path: 'companies',
            loadComponent: () => import('./features/companies/companies-list.page.component'),
          },
          {
            path: 'projects',
            loadComponent: () => import('./features/projects/projects-list.page.component'),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'auctions',
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
