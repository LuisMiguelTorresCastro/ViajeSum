import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login';
import { LoginRoutingModule } from './login-routing.module';
import { RegisterComponent } from './pages/register/register';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    LoginRoutingModule,
  ],
})
export class LoginModule { }
