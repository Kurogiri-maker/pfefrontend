import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatadogDashboardComponent } from './datadog-dashboard.component';
import { DatadogDashboardRoutingModule } from './datadog-dashboard-routing.module';


@NgModule({
  declarations: [
    DatadogDashboardComponent
  ],
  imports: [
    CommonModule,
    DatadogDashboardRoutingModule
  ]
})
export class DatadogDashboardModule { }
