import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.match(/\/api\//)) {
      const token = this.cookieService.get('token');
      console.log(token);

      return next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
    }
    else {
      return next.handle(request);
    }

  }
}
