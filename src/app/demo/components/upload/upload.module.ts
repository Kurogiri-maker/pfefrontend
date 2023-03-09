import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';





@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    UploadRoutingModule,
    FileUploadModule,
    SelectButtonModule
  ]
})
export class UploadModule { }
