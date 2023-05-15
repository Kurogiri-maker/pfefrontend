import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/assets/environments/environments.dev';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private baseUrl = environment.apiUrl + 'api/csv/verify';

  constructor(private http: HttpClient) { }

  verifyEmail(token: string): Observable<any> {
    const url = `${this.baseUrl}?token=${token}`;
    return this.http.get<string>(url, { observe: 'response' });
  }
}
