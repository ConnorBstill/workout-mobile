import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then((m) => m.LogoutModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'register/confirm',
    loadChildren: () => import('./register-confirm/register-confirm.module').then((m) => m.RegisterConfirmModule),
  },
  // {
  //   path: 'invite/confirm',
  //   loadChildren: () => import('./invite-confirm/invite-confirm.module').then((m) => m.InviteConfirmModule),
  // },
  {
    path: 'app',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
