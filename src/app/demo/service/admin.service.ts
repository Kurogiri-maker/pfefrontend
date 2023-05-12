import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environments/environments.dev';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = environment.apiUrl + "api/user"


  constructor(private http: HttpClient) { }

  getUsers(pageSize: number, currentPage: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?page=${currentPage}&size=${pageSize}`);
  }

  getHeader() {
    return this.http.get<string[]>(`${this.apiUrl}/attributes`)
  }


  saveUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  updateUser(object: any) {
    return this.http.patch(`${this.apiUrl}/${object.id}`, object);
  }

  deleteUser(IdDocument: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${IdDocument}`);
  }

  search(searchTerm: String) {
    return this.http.get<string[]>(`${this.apiUrl}/users/find?searchTerm=%25${searchTerm}%25`);
  }
}
