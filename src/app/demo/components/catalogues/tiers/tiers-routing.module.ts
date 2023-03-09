import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiersComponent } from './tiers.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: TiersComponent
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TiersRoutingModule { }
