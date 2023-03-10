import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8086/api/csv/verify';

  constructor(private http: HttpClient) { }

  verifyEmail(token: string):Observable<any> {
    const url = `${this.baseUrl}?token=${token}`;
    return this.http.get<string>(url,{ observe: 'response' });
  }
}
