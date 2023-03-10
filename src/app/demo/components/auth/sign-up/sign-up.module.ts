import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { JwtClientService } from '../login/service/jwt-client.service';
import { RegisterService } from './service/register-service.service';
import { VerificationComponent } from './verification/verification.component';


@NgModule({
  declarations: [
    SignUpComponent,
    VerificationComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [JwtClientService, RegisterService]
})
export class SignUpModule { }
