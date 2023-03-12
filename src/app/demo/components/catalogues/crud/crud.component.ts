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

    editDocumentDialog:boolean =false;

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

    pageSize : number =10;

    currentPage: number =0;


    constructor( private crud : CrudService , private messageService:MessageService){}

    // Get documents after selecting a type (tier,contrat,dossier)
    getDocuments(){
      const val=this.valSelect.name;
      let data=val.charAt(0).toLowerCase() + val.slice(1);
      this.crud.getDocuments(data,this.pageSize,this.currentPage).subscribe((data: any) => {
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
        console.log(this.documentsColumns);
        this.documentsColumns.shift();
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
      this.formData={};
      this.documentDialog=false;
      this.submitted=false;
    }

     // hide the dialog
     hideEditDialog(){
      this.formData={};
      this.editDocumentDialog=false;
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
      this.formData["id"]=document["id"];
      this.documentsColumns.forEach(col => {
        this.formData[col.field] = document[col.field];
      });
      console.log(this.formData);
      this.document = {};
      this.editDocumentDialog=true;
    }

    //update a document
    updateDocument(){
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
        console.log(this.formattedData.entity);
        this.crud.updateDocument(this.formattedData.entity,data).subscribe(
          response => {
            console.log("Response status :" + response);
            // this.crud.getDocuments(data,this.pageSize,this.currentPage).subscribe((documents : any[]) => {
            //   this.documents=documents;
            // });
            
          },
          error => {
            console.log("Error :" + error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Updated', life: 3000 });
      }
      this.formData={};
      this.submitted=false;
      this.editDocumentDialog=false;
      

    }
    

    // delete a document
    deleteDocument(document:any){
      this.document=document;
      this.deleteDocumentDialog=true;

    }

    deleteSelectedDocuments(){
      this.deleteDocumentsDialog=true;
    }

    // Confirm the delete and refresh the table
    confirmDelete() {
      const val=this.valSelect.name;
      let data=val.charAt(0).toLowerCase() + val.slice(1);
      this.crud.deleteDocument(this.document.id,data).subscribe((response) => {
        console.log(response);
        this.getDocuments();
      });
      this.document={};
      this.deleteDocumentDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Deleted', life: 3000 });
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
      
      this.getDocuments();
      
      
    }

}
