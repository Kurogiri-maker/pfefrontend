import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout/app.layout.component';

const routes: Routes = [
  {path: '', component: AppLayoutComponent,
   children: [
    { path: 'upload', loadChildren: () => import('./demo/components/upload/upload.module').then(m => m.UploadModule) },
    { path: 'crud', loadChildren: () => import('./demo/components/catalogues/crud/crud.module').then(m => m.CrudModule) }
   ]
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
