import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardMaterialModule  } from './dashboard-material.module'
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DashboardMaterialModule,
    NgChartsModule,
  ]
})
export class DashboardModule {}