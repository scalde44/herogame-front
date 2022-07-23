import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { UpdateCardComponent } from './components/update-card/update-card.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateCardComponent,
  },
  {
    path: 'delete',
    component: DeleteCardComponent,
  },
  {
    path: 'update',
    component: UpdateCardComponent,
  },
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'create',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
