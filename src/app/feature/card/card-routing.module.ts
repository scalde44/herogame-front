import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { UpdateCardComponent } from './components/update-card/update-card.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardCardComponent,
  },
  {
    path: 'create',
    component: CreateCardComponent,
  },
  
  {
    path: 'update/:id',
    component: UpdateCardComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
