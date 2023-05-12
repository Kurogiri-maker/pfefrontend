import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/assets/environments/environments.dev';



@Injectable({
  providedIn: 'root'
})
export class CrudService {


  apiUrl = environment.apiUrl + "api/csv"

  constructor(private http: HttpClient) { }

  getDocuments(data: string, pageSize: number, currentPage: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${data}?page=${currentPage}&size=${pageSize}`);
  }

  getHeader(data: string) {
    return this.http.get<string[]>(`${this.apiUrl}/${data}/attributes`)
  }

  getLegacyAttributes(data: string) {
    return this.http.get<string[]>(`${this.apiUrl}/${data}/attributes/legacy`)
  }

  saveDocument(formattedData: any, data: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${data}`, formattedData);
  }

  updateDocument(object: any, data: string) {

    return this.http.patch(`${this.apiUrl}/${data}/${object.id}`, object);
  }

  deleteDocument(IdDocument: any, data: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${data}/${IdDocument}`);
  }

  search(searchTerm: string, data: string) {
    return this.http.get<string[]>(`${this.apiUrl}/${data}/find?searchTerm=%25${searchTerm}%25`);
  }

}
