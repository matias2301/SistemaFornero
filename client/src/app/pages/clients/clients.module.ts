import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { ManageClientsComponent } from './manage-clients/manage-clients.component';
import { TableModule } from '../../components/table/table.module';
import { AngularMaterialModule } from './client-material.module'

@NgModule({
  declarations: [ListClientsComponent, ManageClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    TableModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule       
  ]
})
export class ClientsModule { }
