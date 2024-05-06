import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ocr',
    loadComponent: () => import('./ocr/ocr.component'),
  },
];

export default routes;
