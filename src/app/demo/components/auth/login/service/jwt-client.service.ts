import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthRequest } from 'src/app/shared/authRequest';
import { devenvironment } from 'src/assets/environments/environments.dev';


@Injectable({
  providedIn: 'root'
})
export class JwtClientService {
  url: String = devenvironment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public generateToken(request: AuthRequest) {
    return this.http.post(this.url + "auth/authenticate", request, { observe: 'response' })
      .pipe(map((response: any) => {
        return new HttpResponse({
          body: response.body,
          status: response.status,
        })
      }),
        catchError((err) => {
          return of(err);
        }));
  }

  public login(request: AuthRequest): Observable<boolean> {
    return this.generateToken(request).pipe(
      map((response: any) => {
        if (response.status === 200) {
          console.log(response.body.token);
          this.cookieService.set("token", response.body.token);
          return true;
        }
        else {
          console.log("Invalid Credentials");
          return false;
        }
      }
      ),
      catchError(error => {
        console.log("Error occurred during login:", error);
        return of(false);
      })
    );
  }
}
