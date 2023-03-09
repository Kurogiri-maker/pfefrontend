import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiersComponent } from './tiers.component';
import { TiersRoutingModule } from './tiers-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    TiersComponent
  ],
  imports: [
    CommonModule,
    TiersRoutingModule,
    ToastModule,
    TableModule,
    ToolbarModule,
    FileUploadModule,
    CheckboxModule,
  ]
})
export class TiersModule { }
