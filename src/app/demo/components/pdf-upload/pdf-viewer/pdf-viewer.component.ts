import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfViewerService } from 'src/app/demo/service/pdf-viewer.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CrudService } from 'src/app/demo/service/crud.service';






@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
})
export class PdfViewerComponent {

  uploadedFile: any;
  filename: any;
  legacy: any;
  public receivedData!: File;
  extractedData: any[] = [];
  legacyAttributes: any[] = [];
  additionalAttributes: any[] = [];
  content: any[] = [];
  getTypeDialog: boolean = false;
  extractedDataDialog: boolean = false;
  coherenceDialog: boolean = false;
  message !: string;
  coherence: boolean = true;
  type!: string;
  selectedItems: any[] = [];
  verificationMap: any = {};
  haveType: boolean = false;
  dataExtracted: boolean = false;
  possibleSave: boolean = false;
  canHaveAdditionalAttributes: boolean = false;
  collected: boolean = false;








  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private service: PdfViewerService, private crudService: CrudService, private router: Router) { }


  ngOnInit(): void {
    this.receivedData = this.service.file;
    // Retrieve the PDF URL from the query parameter
    // this.route.queryParams.subscribe(params => {
    //   const file = params['src'];
    //   this.uploadedFile = this.sanitizer.bypassSecurityTrustResourceUrl(file);

    // });

    this.route.queryParams.subscribe({
      next: params => {
        console.log(params);
        const file = params['src'];
        this.uploadedFile = this.sanitizer.bypassSecurityTrustResourceUrl(file);
        console.log(this.uploadedFile);

      },
      error: err => this.router.navigate(['/pdf'])

    });
    if (!this.receivedData) {
      this.router.navigate(['/pdf'])
    }

  }

  getType() {
    this.service.getType(this.receivedData).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          const type = event.body;
          this.verificationMap["type"] = type["Type"];
          this.haveType = true;
          console.log(type);
          this.content = Object.entries(type).map(([key, value]) => {
            return { field: key, header: value };
          });
          this.getTypeDialog = true;
          console.log(this.verificationMap);

        }
      }
    );

  }

  collectData() {
    this.extractedDataDialog = true;
    if (!this.collected) {
      this.service.collectData(this.receivedData).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Response) {
            this.extractedDataDialog = true;
            const collectData = event.body;
            console.log(collectData);
            this.extractedData = Object.entries(collectData).map(([key, value]) => {
              return { field: key, header: value };
            });
            this.extractedData.forEach((element: any) => {
              this.verificationMap[element.field] = element.header;
            });
            this.dataExtracted = true;

            console.log(this.extractedData);
            console.log(this.verificationMap);
          }
        }
      );
    }
    this.collected = true;
  }


  saveDocument() {
    // const data: any = {
    //   "type": "Tiers",
    //   "id": null,
    //   "numero": "12",
    //   "nom": "Inga",
    //   "siren": ".@yopmail.com",
    //   "refMandat": "chviz",
    //   "attribute1": "111",
    //   "attribute2": "111",
    //   "attribut3": "111"
    // };
    this.service.saveDocument(this.verificationMap).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          this.coherenceDialog = true;
          this.legacy = event.body.legacyAttributes;
          console.log("legacy:  ", this.legacy);

          const additional = event.body.additionalAttributes;
          this.message = event.body.message;
          this.type = event.body.type.toString().toLowerCase();
          if (this.message == "Le fichier existe") {

            this.legacyAttributes = Object.entries(this.legacy).map(([key, value]) => {
              return { field: key, header: value };
            });
            this.additionalAttributes = Object.entries(additional).map(([key, value]) => {
              return { field: key, header: value };
            });
            this.canHaveAdditionalAttributes = true;

          } else if (this.message == "Le fichier n'existe pas. Voulez vous le sauvegardez ?") {

            this.legacyAttributes = Object.entries(this.legacy).map(([key, value]) => {
              return { field: key, header: value };
            });
            this.legacyAttributes.shift();
            this.additionalAttributes = Object.entries(additional).map(([key, value]) => {
              return { field: key, header: value };
            });

            this.possibleSave = true;
            this.canHaveAdditionalAttributes = true;

          } else if (this.message == "Le fichier n'est pas cohérent") {
            this.coherence = false;
          }


        }

      }
    )
  }
  toDictionary(type: string, items: any[]): { [key: string]: any }[] {
    return items.map((att: string) => ({ type, attribute: att }));
  }

  save() {

    console.log(this.selectedItems);
    console.log(this.toDictionary(this.type, this.selectedItems));

    if (this.possibleSave && this.canHaveAdditionalAttributes) {
      this.service.saveAttributes(this.toDictionary(this.type, this.selectedItems)).subscribe(() => {
      })
      this.crudService.saveDocument(this.legacy, this.type).subscribe(() => { })

    } else if (this.canHaveAdditionalAttributes) {
      this.service.saveAttributes(this.toDictionary(this.type, this.selectedItems)).subscribe(() => {
      })
    }

    this.coherenceDialog = false;
  }

  getSelectedItems() {
    console.log(this.selectedItems);
  }


  hideTypeDialog() {
    this.getTypeDialog = false;
  }

  exitDialog2() {
    this.extractedDataDialog = false;
  }


  hideCoherenceDialog() {
    this.coherenceDialog = false;
  }





}
