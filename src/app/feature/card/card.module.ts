import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http'

import { CardRoutingModule } from './card-routing.module';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';
import { UpdateCardComponent } from './components/update-card/update-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateCardComponent,
    DeleteCardComponent,
    UpdateCardComponent
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule
  ]
})
export class CardModule { }
