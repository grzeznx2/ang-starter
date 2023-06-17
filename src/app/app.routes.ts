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
            path: 'ngos',
            loadComponent: () => import('./features/ngo/ngo-list.page.component'),
          },
          {
            path: 'manage/offers',
            loadComponent: () => import('./features/offers/manage-offers.page.component'),
          },
          {
            path: 'manage/projects',
            loadComponent: () => import('./features/projects/manage-projects.page.component'),
          },
          {
            path: 'manage/projects/form',
            loadComponent: () => import('./features/projects/project-form.page.component'),
          },
          {
            path: 'manage/ngo-profile',
            loadComponent: () => import('./features/ngo/ngo-profile.page.component'),
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
