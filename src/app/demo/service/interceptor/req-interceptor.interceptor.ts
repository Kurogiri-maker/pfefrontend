import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { JwtClientService } from '../../components/auth/login/service/jwt-client.service';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private auth: JwtClientService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.match(/\/api\//) && this.auth.loggedIn()) {
      // console.log("intercepted");

      const token = this.cookieService.get('token');
      //console.log(token);

      return next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
    }
    else {
      // if (!this.auth.loggedIn()) {
      //   console.log("not logged in");
      // }
      return next.handle(request);
    }

  }
}
