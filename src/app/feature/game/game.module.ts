import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/service/auth.service';
import { TableroComponent } from './components/tablero/tablero.component';

@NgModule({
  declarations: [HomeComponent, TableroComponent],
  imports: [CommonModule,
    GameRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [AuthService]
})
export class GameModule { }
