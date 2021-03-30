import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { ManageClientsComponent } from './manage-clients/manage-clients.component';

export const routes = [  
  { path: 'list-clients', component: ListClientsComponent },  
  { path: 'manage-clients', component: ManageClientsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
