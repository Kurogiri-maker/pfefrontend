import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout/app.layout.component';
import { AdminAuthGuard, JwtAuthGuard } from './demo/service/guard/auth-guard.guard';


const routes: Routes = [
  {
    path: '', component: AppLayoutComponent, canActivate: [JwtAuthGuard],
    children: [{
      path: 'upload', loadChildren: () => import('./demo/components/upload/upload.module')
        .then(m => m.UploadModule), canActivate: [JwtAuthGuard]
    },
    {
      path: 'crud', loadChildren: () => import('./demo/components/catalogues/crud/crud.module')
        .then(m => m.CrudModule), canActivate: [JwtAuthGuard]
    },
    {
      path: 'admin', loadChildren: () => import('./demo/components/admin/admin.module')
        .then(m => m.AdminModule), canActivate: [AdminAuthGuard, JwtAuthGuard]
    },
    {
      path: 'pdf', loadChildren: () => import('./demo/components/pdf-upload/pdf-upload.module')
        .then(m => m.PdfUploadModule), canActivate: [JwtAuthGuard]
    },
    ]
  },
  {
    path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module')
      .then(m => m.AuthModule)
  },

]





// const routes: Routes = [
//   {
//     path: '', component: AppLayoutComponent,
//     children: [{ path: 'tiers', loadChildren: () => import('./demo/components/catalogues/tiers/tiers.module').then(m => m.TiersModule) }]
//   },
//   { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) }
// ];


// const routes: Routes = [
//   {
//     path: '', loadChildren: () => import('./layout/app.layout/app.layout.module')
//       .then(m => m.AppLayoutModule)
//   },
//   {
//     path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module')
//       .then(m => m.AuthModule)
//   }
// ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
