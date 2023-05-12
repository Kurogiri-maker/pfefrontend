import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MessageService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';




@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    InputTextModule,
    PaginatorModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    DialogModule,
    ToastModule,
    SelectButtonModule,
    InputSwitchModule
  ],
  providers: [MessageService]
})
export class AdminModule { }
