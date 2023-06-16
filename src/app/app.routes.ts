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
