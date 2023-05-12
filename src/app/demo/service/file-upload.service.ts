import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest , HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  //private apiUrl = 'http://localhost:8086/api/csv'; 
  private apiUrl = 'http://talancdz-service:8086/api/csv'; 

  constructor(private http: HttpClient) { }

  uploadFile(file: File, data: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    
    const req = new HttpRequest('POST', `${this.apiUrl}/${data}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);  }
}
