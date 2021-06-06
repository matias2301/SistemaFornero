import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RepairsRoutingModule } from './repairs-routing.module';
import { ListRepairsComponent } from './list-repairs/list-repairs.component';
import { ManageRepairsComponent } from './manage-repairs/manage-repairs.component';

import { TableModule } from '../../components/table/table.module';
import { AngularMaterialModule } from './repairs-material.module'


@NgModule({
  declarations: [ListRepairsComponent, ManageRepairsComponent],
  imports: [
    CommonModule,
    RepairsRoutingModule,
    TableModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule  
  ]
})
export class RepairsModule { }
