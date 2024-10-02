import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { AuthenticationProxy } from './proxies/authentication.proxy.service';
import { AuthenticationService } from './services/authentication-service.service';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponentComponent } from './components/not-found.component/not-found.component.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [AuthenticationProxy, AuthenticationService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
