import { Component, ViewChild  } from '@angular/core';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { PdfViewerService } from '../../service/pdf-viewer.service';




@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.css']
})
export class PdfUploadComponent {

  
  @ViewChild('fileUpload') fileUpload: any;

  uploadMessages: Message[] = [];

  uploadedFile:any;

  


  constructor(private router: Router , private service: PdfViewerService) {}

  onUpload(event:any){
     const file = event.files[0];
     this.service.file=event.files[0];
     const pdfUrl = URL.createObjectURL(file);
     // Navigate to the PDF viewer component with the PDF URL as a query parameter
     this.router.navigate(['/pdf/view'], { queryParams: { src: pdfUrl } });
  }

}
