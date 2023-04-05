import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = "http://localhost:8086/api/user"


  constructor(private http : HttpClient) { }

  getUsers( pageSize: number, currentPage: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?page=${currentPage}&size=${pageSize}`);
  }

  search(searchTerm : String){
    return this.http.get<string[]>(`${this.apiUrl}/users/find?searchTerm=%25${searchTerm}%25`);
  }
}
