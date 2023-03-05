import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app.layout.component';
import { AppTopbarComponent } from './app.topbar/app.topbar.component';
import { AppSidebarComponent } from './app.sidebar/app.sidebar.component';
import { AppMenuComponent } from './app.menu/app.menu.component';
import { AppMenuitemComponent } from './app.menu/app.menuitem.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AppLayoutComponent,
    AppTopbarComponent,
    AppSidebarComponent,
    AppMenuComponent,
    AppMenuitemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AppLayoutModule { }
