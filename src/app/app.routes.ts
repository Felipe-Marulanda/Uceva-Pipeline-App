import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((c) => c.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((c) => c.About),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((c) => c.Contact),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
