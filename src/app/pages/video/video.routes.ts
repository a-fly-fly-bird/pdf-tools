import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'edit',
    loadComponent: () => import('./video-edit/video-edit.component'),
  },
];

export default routes;
