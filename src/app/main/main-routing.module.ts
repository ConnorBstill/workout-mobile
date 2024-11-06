import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-workouts',
      },
      {
        path: 'my-workouts',
        loadChildren: () => import('./my-workouts/my-workouts.module').then((m) => m.MyWorkoutsModule),
      },
      {
        path: 'my-account',
        loadChildren: () => import('../main/my-account/my-account.module').then((m) => m.MyAccountModule),
      },
      {
        path: 'explore',
        loadChildren: () => import('../main/explore/explore.module').then((m) => m.ExploreModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
