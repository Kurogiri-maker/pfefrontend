import { UploadComponent } from './upload.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';




@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: UploadComponent}
    ])
  ],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
