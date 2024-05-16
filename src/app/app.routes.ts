import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    // https://github.com/angular/angular/pull/47586
    // feat about do not use then to import module
    path: 'home',
    loadComponent: () => import('./pages/homepage/homepage.component'),
  },
  {
    path: 'pdf',
    loadChildren: () => import('./pages/pdf/pdf.routes'),
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/video/video.routes'),
  },
  {
    path: 'picture',
    loadChildren: () => import('./pages/picture/picture.routes'),
  },
  {
    path: 'agile',
    loadComponent: () => import('./pages/agile/agile/agile.component'),
  },
];
