import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { ManageClientsComponent } from './manage-clients/manage-clients.component';
import { TableModule } from '../../components/table/table.module';

@NgModule({
  declarations: [ListClientsComponent, ManageClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    TableModule    
  ]
})
export class ClientsModule { }
