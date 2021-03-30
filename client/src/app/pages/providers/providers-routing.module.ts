import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageProvidersComponent } from './manage-providers/manage-providers.component';
import { ListProvidersComponent } from './list-providers/list-providers.component';

export const routes = [  
  { path: 'list-providers', component: ListProvidersComponent },  
  { path: 'manage-providers', component: ManageProvidersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
