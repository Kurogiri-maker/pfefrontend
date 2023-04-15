import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { PdfUploadRoutingModule } from './pdf-upload-routing.module';
import { PdfUploadComponent } from './pdf-upload.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    PdfUploadComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    PdfUploadRoutingModule,
    FileUploadModule,
    DialogModule,
    PdfViewerModule
  ]
})
export class PdfUploadModule { }
