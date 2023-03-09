import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';






@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    CrudRoutingModule,
    DialogModule,
    FormsModule,
    SelectButtonModule,
    PaginatorModule
  ],
  declarations: [CrudComponent],
  providers: [MessageService]
})
export class CrudModule { }
