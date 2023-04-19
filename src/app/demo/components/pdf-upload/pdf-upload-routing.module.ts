import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfUploadComponent } from './pdf-upload.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

const routes: Routes = [
  { path: '', component: PdfUploadComponent},
  {path: 'view', component: PdfViewerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfUploadRoutingModule { 
  
}
