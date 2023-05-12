import { MessageService } from 'primeng/api';
import { CrudService } from './../../../service/crud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  @ViewChild('table') table!: Table;


  documentDialog: boolean = false;

  editDocumentDialog: boolean = false;

  deleteDocumentDialog: boolean = false;

  deleteDocumentsDialog: boolean = false;

  documents: any[] = [];

  content: any[] = [];

  selectedDocuments: any[] = [];

  document: any = {};

  documentsColumns: any[] = [];

  submitted: boolean = false;

  formData: any = {};

  formattedData = {
    entity: this.formData
  };

  documentsOptions: any[] = [];

  valSelect: { name: string, value: number } = { name: 'Tiers', value: 1 };

  totalRecords !: number;

  pageSize !: number;

  currentPage!: number;

  searchTerm!: string;

  additionalAttributesSet: any[] = [];

  legacyAttributes: any[] = [];


  constructor(private crud: CrudService, private messageService: MessageService) { }

  // Get documents after selecting a type (tiers,contrat,dossier)
  getDocuments() {
    const val = this.valSelect.name;
    let data = val.charAt(0).toLowerCase() + val.slice(1);
    this.crud.getDocuments(data, this.pageSize, this.currentPage).subscribe((data: any) => {
      this.content = data.content;
      this.documents = this.content.map(obj => {
        const transformedObj: any = {
          id: obj.id,
          numero: obj.numero,
          nom: obj.nom,
          siren: obj.siren,
          refMandat: obj.refMandat
        };
        obj.additionalAttributesSet.forEach((attr: any) => {
          transformedObj[attr.cle] = attr.valeur;
        });

        return transformedObj;

      });
      console.log("content: ", this.content);

      console.log("documents: ", this.documents);
      this.additionalAttributesSet = this.content.map(({ additionalAttributesSet, ...rest }) => additionalAttributesSet);
      console.log("additionalAttributesSet: ", this.additionalAttributesSet);


      this.totalRecords = data.totalElements;
      this.getHeader();
      console.log(data);
    });
  }


  // get the metadata of the selected type
  getHeader() {
    const val = this.valSelect.name;
    let data = val.charAt(0).toLowerCase() + val.slice(1);
    this.crud.getHeader(data).subscribe((metadata: string[]) => {
      this.documentsColumns = Object.values(metadata).map((key) => {
        return { field: key, header: key.charAt(0).toUpperCase() + key.slice(1) };
      });
      console.log(this.documentsColumns);
      this.documentsColumns.shift();
    });
    this.crud.getLegacyAttributes(data).subscribe((legacyAttributes: string[]) => {
      this.legacyAttributes = legacyAttributes;
      console.log("legacyAttributes: ", this.legacyAttributes);
    });
  }

  // Pagination
  paginate(event: any) {
    this.currentPage = event.page;
    this.pageSize = event.rows;
    this.getDocuments();
  }

  // open a dialog to create a new document
  openNew() {
    this.document = {};
    this.submitted = false;
    this.documentDialog = true;
  }


  // hide the dialog
  hideDialog() {
    this.formData = {};
    this.documentDialog = false;
    this.submitted = false;
  }

  // hide the dialog
  hideEditDialog() {
    this.formData = {};
    this.editDocumentDialog = false;
    this.submitted = false;
  }


  // save a document
  saveDocument() {
    const val = this.valSelect.name;
    let data = val.charAt(0).toLowerCase() + val.slice(1);
    this.submitted = true;
    this.documentsColumns.forEach(col => {
      this.formData[col.field] = (<HTMLInputElement>document.getElementById(col.field)).value;
      if (!this.formData[col.field]) {
        this.submitted = false;
        return;
      }
    });
    if (!this.submitted) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Field missing', life: 3000 });
      return;
    } else {
      this.crud.saveDocument(this.formData, data).subscribe({
        next: (response) => console.log("Response status :" + response),
        error: (error) => console.log("Error :" + error),
        complete: () => this.getDocuments()
      }
      );
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Created', life: 3000 });
    }
    this.formData = {};
    this.submitted = false;
    this.documentDialog = false;


  }

  // update a document
  editDocument(document: any) {
    console.log(document);
    this.formData["id"] = document["id"];

    this.documentsColumns.forEach(col => {
      this.formData[col.field] = document[col.field];
    });
    //console.log(this.formData);
    this.document = {};
    //console.log(this.document);
    this.editDocumentDialog = true;
  }

  //update a document
  updateDocument() {
    const val = this.valSelect.name;
    let data = val.charAt(0).toLowerCase() + val.slice(1);
    this.submitted = true;
    this.documentsColumns.forEach(col => {
      this.formData[col.field] = (<HTMLInputElement>document.getElementById(col.field)).value;
      // if (!this.formData[col.field]) {
      //   this.submitted = false;
      //   return;
      // }
    });
    let id = this.formData["id"];
    let object: any = {};
    object = this.content.find((obj: any) => obj.id === id);
    // console.log("objet:  ");
    // console.log(object);
    // console.log(this.formData);
    Object.keys(this.formData).forEach((key: any) => {
      if (this.legacyAttributes.includes(key)) {

        object[key] = this.formData[key];
      }
      else if (this.formData[key] != "") {
        let index = object.additionalAttributesSet.findIndex((attr: any) => attr.cle == key);
        console.log(index);

        if (index === -1) {
          object.additionalAttributesSet.push({ cle: key, valeur: this.formData[key] });
        }

        object.additionalAttributesSet.forEach((attr: any) => {
          if (attr.cle === key) {
            attr.valeur = this.formData[key];
          }
        });
      }
    }


    );
    console.log("new object: ", object);
    //console.log(object);



    if (!this.submitted) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Field missing', life: 3000 });
      return;
    } else {
      this.crud.updateDocument(object, data).subscribe({
        next: (response) => console.log("Response status :" + response),
        error: (error) => console.log("Error :" + error),
        complete: () => this.getDocuments()
      }

      );
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Updated', life: 3000 });
    }
    this.formData = {};
    this.submitted = false;
    this.editDocumentDialog = false;


  }


  // delete a document
  deleteDocument(document: any) {
    this.document = document;
    this.deleteDocumentDialog = true;

  }

  deleteSelectedDocuments() {
    this.deleteDocumentsDialog = true;
  }

  // Confirm the delete and refresh the table
  confirmDelete() {
    const val = this.valSelect.name;
    let data = val.charAt(0).toLowerCase() + val.slice(1);
    this.crud.deleteDocument(this.document.id, data).subscribe((response) => {
      console.log(response);
      this.getDocuments();
    });
    this.document = {};
    this.deleteDocumentDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Document Deleted', life: 3000 });
  }


  // Confirm the deletion fo selected documetns
  confirmDeleteSelected() {
    const val = this.valSelect.name;
    let data = val.charAt(0).toLowerCase() + val.slice(1);
    this.selectedDocuments.forEach(val => {
      this.crud.deleteDocument(val.id, data).subscribe((response) => {
        this.getDocuments();
      });
    });
    this.selectedDocuments = [];
    this.deleteDocumentsDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Documents Deleted', life: 3000 });

  }


  cancel() {
    this.deleteDocumentDialog = true;
  }

  search(value: string): void {
    const val = this.valSelect.name;
    let data = val.charAt(0).toLowerCase() + val.slice(1);
    this.crud.search(this.searchTerm, data).subscribe({
      next: value => {
        this.documents = value;
      },
      error: err => console.error(err),
      complete: () => { }
    });
  }


  ngOnInit() {

    this.documentsOptions = [
      { name: 'Tiers', value: 1 },
      { name: 'Contrat', value: 2 },
      { name: 'Dossier', value: 3 }
    ];

    this.pageSize = 10;
    this.currentPage = 0;
    this.getDocuments();


  }

}
