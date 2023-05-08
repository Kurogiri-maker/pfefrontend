import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { JwtClientService } from './service/jwt-client.service';
import { JwtHelperService } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [JwtClientService]
})
export class LoginModule {
}
