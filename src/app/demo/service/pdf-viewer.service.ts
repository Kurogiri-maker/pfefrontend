import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest , HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PdfViewerService {

  private apiUrl = 'http://localhost:8086/kafka';

  public file!: File;



  constructor(private http: HttpClient) { }

  getType(file: File): Observable<HttpEvent<any>>{
    const formData = new FormData();
    formData.append('file', file);
    
    const req = new HttpRequest('POST', `${this.apiUrl}/type`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);  
  }

  collectData(file: File): Observable<HttpEvent<any>>{
    const formData = new FormData();
    formData.append('file', file);
    
    const req = new HttpRequest('POST', `${this.apiUrl}/collect`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);  
  }
}
