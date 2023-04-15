import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfViewerService } from 'src/app/demo/service/pdf-viewer.service';
import { HttpEvent , HttpEventType } from '@angular/common/http';





@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
})
export class PdfViewerComponent {

  uploadedFile: any;
  filename: any;
  public receivedData!: File;
  extractedData: any[] = [];
  showData1: boolean = false;
  showData2:boolean = false;
  content!:string;
  getTypeDialog:boolean=false;
  extractedDataDialog:boolean=false;
  isHovered:boolean=false;


  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer , private service: PdfViewerService) {}


  ngOnInit(): void {
    this.receivedData = this.service.file;
    // Retrieve the PDF URL from the query parameter
    this.route.queryParams.subscribe(params => {
      const file = params['src'];
      this.uploadedFile=this.sanitizer.bypassSecurityTrustResourceUrl(file);
      
    });
  }

  getType(){
    this.service.getType(this.receivedData).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          //this.showData1 =true;
          const type = event.body.result;
          this.content=type;
          console.log(type);
          this.getTypeDialog=true;
        }
      }
    );
  }

  collectData(){
    this.service.collectData(this.receivedData).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          this.extractedDataDialog =true;
          const collectData = event.body;
          console.log(collectData);
          this.extractedData = Object.entries(collectData).map(([key, value]) => {
            return { field: key, header: value};
          });
          
          console.log(this.extractedData);
        }
      }
    );
  }

  toggleShowData1() {
    this.showData1 = false;
  }

  toggleShowData2() {
    this.showData2 = false;
  }

  exitDialog1(){
    this.getTypeDialog=false;
  }

  exitDialog2(){
    this.extractedDataDialog=false;
  }


  
  

}
