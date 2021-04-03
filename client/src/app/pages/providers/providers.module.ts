import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ListProvidersComponent } from './list-providers/list-providers.component';
import { ManageProvidersComponent } from './manage-providers/manage-providers.component';
import { TableModule } from '../../components/table/table.module';


@NgModule({
  declarations: [ListProvidersComponent, ManageProvidersComponent],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    TableModule   
  ]
})
export class ProvidersModule { }
