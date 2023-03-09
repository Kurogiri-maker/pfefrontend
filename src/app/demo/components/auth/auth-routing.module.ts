import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: 'login', loadChildren: () => import('./login/login.module')
          .then(m => m.LoginModule)
      },
      {
        path: 'register', loadChildren: () => import('./sign-up/sign-up.module')
          .then(m => m.SignUpModule)
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
