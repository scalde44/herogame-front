import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./feature/admin/admin.module').then((m) => m.AdminModule),
      canActivate: [AuthGuard],
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./feature/game/game.module').then((m) => m.GameModule),
      canActivate: [AuthGuard],
  },
  {
    path: 'card',
    loadChildren: () =>
      import('./feature/card/card.module').then((m) => m.CardModule),
      canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
