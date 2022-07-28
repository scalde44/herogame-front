import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http'
import {NgxPaginationModule} from 'ngx-pagination';
import { CardRoutingModule } from './card-routing.module';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { UpdateCardComponent } from './components/update-card/update-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardService } from './service/card.service';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { AuthService } from '../auth/service/auth.service';


@NgModule({
  declarations: [
    CreateCardComponent,
    UpdateCardComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [CardService, AuthService]
})
export class CardModule { }
