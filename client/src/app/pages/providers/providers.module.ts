import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ListProvidersComponent } from './list-providers/list-providers.component';
import { ManageProvidersComponent } from './manage-providers/manage-providers.component';

import { TableModule } from '../../components/table/table.module';
import { AngularMaterialModule } from './provider-material.module'

@NgModule({
  declarations: [ListProvidersComponent, ManageProvidersComponent],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    TableModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule   
  ]
})
export class ProvidersModule { }
