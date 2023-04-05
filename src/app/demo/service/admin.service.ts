import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = "http://localhost:8086/api/user"


  constructor(private http: HttpClient) { }

  getUsers(pageSize: number, currentPage: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?page=${currentPage}&size=${pageSize}`);
  }

<<<<<<< HEAD
  search(searchTerm: String) {
=======
  getHeader(){
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

  search(searchTerm : String){
>>>>>>> 5fa47e1e9356786dcc9eeef613c886f0963406cf
    return this.http.get<string[]>(`${this.apiUrl}/users/find?searchTerm=%25${searchTerm}%25`);
  }

  getHeader() {
    return this.http.get<string[]>(`${this.apiUrl}/attributes`)
  }
}
