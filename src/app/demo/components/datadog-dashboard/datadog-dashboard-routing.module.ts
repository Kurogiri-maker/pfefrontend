import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatadogDashboardComponent } from './datadog-dashboard.component';

const routes: Routes = [
  {path: '', component: DatadogDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatadogDashboardRoutingModule { }
