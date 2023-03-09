import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of } from 'rxjs';
import { RegisteryRequest } from 'src/app/shared/registeryRequest';
import { devenvironment } from 'src/assets/environments/environments.dev';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url: String = devenvironment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public generateToken(request: RegisteryRequest) {
    return this.http.post(this.url + "auth/register", request, { observe: 'response' })
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

  public signUp(request: RegisteryRequest): Observable<{ success: boolean, exists: boolean }> {
    return this.generateToken(request).pipe(
      map((response: any) => {
        if (response.status === 200) {
          console.log(response.body.token);
          console.log(response.body.error);
          this.cookieService.set("token", response.body.token);
          return { success: true, exists: false };
        }
        else if (response.status === 400) {
          console.log(response.error.error);
          return { success: false, exists: true };
        }
        else {
          throw new Error("Unexpected response status: " + response.status);
        }
      }
      ),
      catchError((error: any) => {
        console.log("Error occurred during login:", error);
        return of({ success: false, exists: false });
      })
    );
  }
}
