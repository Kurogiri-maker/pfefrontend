import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: "verif", component: VerificationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
