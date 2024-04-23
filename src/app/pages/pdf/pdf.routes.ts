import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'merge',
    loadComponent: () => import('./pdf-merge/pdf-merge.component'),
  },
  {
    path: 'split',
    loadComponent: () => import('./pdf-split/pdf-split.component'),
  },
];

export default routes;
