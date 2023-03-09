import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app.layout.component';
import { AppTopbarComponent } from './app.topbar/app.topbar.component';
import { AppSidebarComponent } from './app.sidebar/app.sidebar.component';
import { AppMenuComponent } from './app.menu/app.menu.component';
import { AppMenuitemComponent } from './app.menu/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppConfigModule } from '../config/app.config/app.config.module';
import { AppLayoutRoutingModule } from './app.layout-routing.module';




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
    RouterModule,
    AppConfigModule,
    AppLayoutRoutingModule
  ],
  exports: [
    AppTopbarComponent,
  ]
})
export class AppLayoutModule { }
