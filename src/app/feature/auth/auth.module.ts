import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RestoreComponent } from './components/restore/restore.component';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RestoreComponent],
  imports: [CommonModule, AuthRoutingModule],
  providers: [AuthService],
})
export class AuthModule {}
