import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { HomeMaterialModule  } from './dashboard-material.module'

export const routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    data: {
      breadcrumb: 'Dashboard'
    }
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    FlexLayoutModule,
    HomeMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule {
    constructor() { }
}
