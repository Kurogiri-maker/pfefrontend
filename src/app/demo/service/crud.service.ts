import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  apiUrl = "http://localhost:8086/api/csv"

  constructor(private http: HttpClient) { }

  getDocuments(data:string,pageSize:number,currentPage:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/${data}?page=${currentPage}&size=${pageSize}`);
  }

  getHeader(data: string){
    return this.http.get<string[]>(`${this.apiUrl}/${data}/attributes`)
  }

  saveDocument(formattedData: any,data:string):Observable<any> {
    return this.http.post(`${this.apiUrl}/${data}`, formattedData);
  }

  deleteDocument(IdDocument:any,data:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${data}/${IdDocument}`);
  }

}
