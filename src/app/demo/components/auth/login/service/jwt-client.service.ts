import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthRequest } from 'src/app/shared/authRequest';
import { devenvironment } from 'src/assets/environments/environments.dev';
import jwt_decode from 'jwt-decode';



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

  public login(request: AuthRequest): Observable<{ success: boolean, error: string }> {
    return this.generateToken(request).pipe(
      map((response: any) => {
        if (response.status === 200) {
          console.log(response.body.token);
          this.cookieService.set("token", response.body.token);
          console.log("admin: ", this.isAdmin());
          console.log("loggedIn: ", this.loggedIn());

          return { success: true, error: "" };
        }
        else if (response.status === 400) {
          if (response.error.error === "Bad credentials") {
            console.log("Bad credentials");
            return { success: false, error: "Bad credentials" };
          }
          else if (response.error.error === "User is disabled") {
            console.log("User is disabled");
            return { success: false, error: "User is disabled" };
          }
          else {
            console.log("response.error.error");
            return { success: false, error: response.error.error };
          }

        }
        else {
          throw new Error("Unexpected response status: " + response.status);
        }
      }
      ),
      catchError(error => {
        console.log("Error occurred during login:", error);
        return of({ success: false, error: "" });
      })
    );
  }

  public loggedIn(): boolean {
    const token = this.cookieService.get("token");
    return !!token; // return true if token exists, false otherwise
  }

  public isAdmin(): boolean {
    const token = this.cookieService.get("token");
    if (!token) {
      return false; // user is not logged in, so not an admin
    }
    const decodedToken: any = jwt_decode(token);
    const userRole = decodedToken["role"];
    console.log("userRole: ", userRole);

    return userRole === "ADMIN";

  }
}


