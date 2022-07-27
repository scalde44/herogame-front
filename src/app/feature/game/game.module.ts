import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/service/auth.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, 
    GameRoutingModule, 
    FormsModule,
    ReactiveFormsModule],
    providers: [AuthService]
})
export class GameModule {}
