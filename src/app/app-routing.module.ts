import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout/app.layout.component';


// const routes: Routes = [
//   {
//     path: '', component: AppLayoutComponent,
//     children: [{ path: 'tiers', loadChildren: () => import('./demo/components/catalogues/tiers/tiers.module').then(m => m.TiersModule) }]
//   },
//   { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) }
// ];


const routes: Routes = [
  {
    path: '', loadChildren: () => import('./layout/app.layout/app.layout.module')
      .then(m => m.AppLayoutModule)
  },
  {
    path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module')
      .then(m => m.AuthModule)
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
