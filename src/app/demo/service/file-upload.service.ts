import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environments/environments.dev';


@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  private apiUrl = environment.apiUrl + 'api/csv';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, data: string): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.apiUrl}/${data}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
