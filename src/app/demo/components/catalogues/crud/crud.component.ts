import { MessageService } from 'primeng/api';
import { CrudService } from './../../../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

    documentDialog: boolean = false;

    deleteDocumentDialog: boolean = false;

    deleteDocumentsDialog: boolean = false;

    documents: any[] = [] ;

    selectedDocuments: any[] = [];

    document: any;

    documentsColumns: any[] = [] ;

    submitted: boolean = false;

    formData: any = {};

    formattedData = {
      entity: this.formData
    };

    documentsOptions: any[]= [];

    valSelect: { name: string, value: number } = { name: 'Tier', value: 1 };

    totalRecords !:number;

    pageSize!: number;

    currentPage!: number;

    constructor( private crud : CrudService , private messageService:MessageService){}

    // Get documents after selecting a type (tier,contrat,dossier)
    getDocuments(){
      const val=this.valSelect.name;
      let data=val.charAt(0).toLowerCase() + val.slice(1);
      this.crud.getDocuments(data,this.pageSize,this.currentPage).subscribe((data: any) => {
        console.log(data.totalElements);
        this.documents = data.content;
        this.totalRecords=data.totalElements;
        this.getHeader();
      });
    }


    // get the metadata of the selected type
    getHeader(){
      const val=this.valSelect.name;
      let data=val.charAt(0).toLowerCase() + val.slice(1);
      this.crud.getHeader(data).subscribe((metadata:string[]) => {
        this.documentsColumns=Object.values(metadata).map((key) => {
          return { field: key , header: key.charAt(0).toUpperCase() + key.slice(1) };
        });
        // this.documentsColumns.shift();
      });
    }

    // Pagination
    paginate(event:any){
      this.currentPage=event.page;
      this.pageSize=event.rows;
      this.getDocuments();
    }
    
    // open a dialog to create a new document
    openNew() {
      this.document = {};
      this.submitted = false;
      this.documentDialog = true;
    }


    // hide the dialog
    hideDialog(){
      this.documentDialog=false;
      this.submitted=false;
    }

    // save a document
    saveDocument(){
      const val=this.valSelect.name;
      let data=val.charAt(0).toLowerCase() + val.slice(1);
      this.submitted=true;
      this.documentsColumns.forEach(col => {
        this.formData[col.field] = (<HTMLInputElement>document.getElementById(col.field)).value;
        if(!this.formData[col.field]){
          this.submitted=false;
          return;
        }
      });
      if(!this.submitted){
        this.messageService.add({severity:'error', summary:'error', detail: 'Field missing', life: 3000});
        return;
      }else{
        this.crud.saveDocument(this.formattedData.entity,data).subscribe(
          response => {
            console.log("Response status :" + response);
          },
          error => {
            console.log("Error :" + error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Created', life: 3000 });
      }
      this.formData={};
      this.submitted=false;
      this.documentDialog=false;
    }

    // update a document
    editDocument(document:any){
      console.log(document);
      this.documentsColumns.forEach(col => {
        this.formData[col.field] = document[col.field];
      });
      console.log(this.formData);
      this.documentDialog=true;
    }

    // delete a document
    deleteDocument(document:any){
      const val=this.valSelect.name;
      let data=val.charAt(0).toLowerCase() + val.slice(1);
      this.deleteDocumentDialog=true;
      this.crud.deleteDocument(document.id,data).subscribe((response) => {
        console.log(response);
      });

    }

    deleteSelectedDocuments(){
      this.deleteDocumentsDialog=true;
    }

    // Confirm the delete and refresh the table
    confirmDelete() {
      this.deleteDocumentDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Deleted', life: 3000 });
      this.getDocuments();
    }


    // Confirm the deletion fo selected documetns
    confirmDeleteSelected(){
      const val=this.valSelect.name;
      let data=val.charAt(0).toLowerCase() + val.slice(1);
      this.selectedDocuments.forEach(val=>{
        this.crud.deleteDocument(val.id,data).subscribe((response) => {
          this.getDocuments();
        });
      });
      this.selectedDocuments=[];
      this.deleteDocumentsDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Documents Deleted', life: 3000 });
      
    }


    cancel(){
      this.deleteDocumentDialog=true;
    }


    ngOnInit() {
      
      this.documentsOptions = [
        { name: 'Tier', value: 1 },
        { name: 'Contrat', value: 2 },
        { name: 'Dossier', value: 3 }
      ];

      this.pageSize=10;
      this.currentPage=0;

      this.getDocuments();
    }

}
