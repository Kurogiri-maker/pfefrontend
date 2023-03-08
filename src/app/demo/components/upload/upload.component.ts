import { Component,OnInit , OnDestroy} from '@angular/core';
import { HttpEvent , HttpEventType } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FileUploadService } from '../../service/file-upload.service';
import { Message } from 'primeng/api';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [MessageService , FileUploadService]
})
export class UploadComponent implements OnInit, OnDestroy {

  uploadMessages: Message[] = [];

  documentsOptions: any[]= [];

  valSelect!: any;




  constructor(private messageService: MessageService , private fileUploadService : FileUploadService) {}


  onUpload(event: any) {
    const file: File = event.files[0];
    let data = this.valSelect.name;
    data=data.charAt(0).toLowerCase() + data.slice(1);
    console.log(data);
    this.fileUploadService.uploadFile(file , data).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          const message = event.body.message; // get the message from the response body
          this.uploadMessages = [{severity:'success', summary:'Success', detail: message}];
          setTimeout(() => {
            this.uploadMessages = [];
          }, 5000); 
        }
      },
      (error) => {
        const message = error.error.message; // get the message from the error response
        this.uploadMessages = [{severity:'error', summary:'Error', detail: message}];
      }
    );
  }

  
  ngOnInit() {

    this.documentsOptions = [
      { name: 'Tier', value: 1 },
      { name: 'Contrat', value: 2 },
      { name: 'Dossier', value: 3 }
  ];
   
  }

  ngOnDestroy() {
  }


}
