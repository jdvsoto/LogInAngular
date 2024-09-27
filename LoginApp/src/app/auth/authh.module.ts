import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthhRoutingModule } from './authh-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthhRoutingModule],
})
export class AUTH_MODULE {}
