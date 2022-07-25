import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http'

import { CardRoutingModule } from './card-routing.module';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { UpdateCardComponent } from './components/update-card/update-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardService } from './service/card.service';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';


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
    HttpClientModule
  ],
  providers: [CardService]
})
export class CardModule { }
