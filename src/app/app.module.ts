import { AppLayoutModule } from './layout/app.layout/app.layout.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReqInterceptor } from './demo/service/interceptor/req-interceptor.interceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ReqInterceptor, multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
