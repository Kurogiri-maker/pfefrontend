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
  legacyAttributes: any[] = [];
  additionalAttributes: any[] = [];
  content: any[] = [];
  getTypeDialog:boolean=false;
  extractedDataDialog:boolean=false;
  coherenceDialog:boolean=false;



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
          const type = event.body;
          console.log(type);
          this.content = Object.entries(type).map(([key, value]) => {
            return { field: key, header: value};
          });
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


  saveDocument(){
    const data:any ={
      "type":"Tiers",
      "id":null,
      "numero":"11",
      "nom":"Inga",
      "siren":".@yopmail.com",
      "ref_mandat":"chviz",
      "attribute1":"111"
  };
    this.service.saveDocument(data).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          this.coherenceDialog =true;
          console.log(event.body);
          const legacy = event.body.legacyAttributes;
          const additional = event.body.additionalAttributes;
          this.legacyAttributes = Object.entries(legacy).map(([key, value]) => {
            return { field: key, header: value};
          });
          this.additionalAttributes = Object.entries(additional).map(([key, value]) => {
            return { field: key, header: value};
          });
        }
          
      }
    )
  }


  exitDialog1(){
    this.getTypeDialog=false;
  }

  exitDialog2(){
    this.extractedDataDialog=false;
  }

  
  exitDialog3(){
    this.coherenceDialog=false;
  }


  
  

}
