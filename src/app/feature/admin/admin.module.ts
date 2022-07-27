import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
  providers: [AuthService]
})
export class AdminModule {}
