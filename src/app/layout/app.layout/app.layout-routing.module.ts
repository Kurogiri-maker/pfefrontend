import { NgModule } from '@angular/core';
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
