import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app.layout.component';


const routes: Routes = [
  {
    path: '', component: AppLayoutComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AppLayoutRoutingModule { }
