import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth.guard';
import { Layout } from './layout/layout';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'oficinas',
        loadComponent: () =>
          import('@features/oficinas/oficinas-responsables/oficinas-responsables').then(
            (m) => m.OficinasResponsables,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];