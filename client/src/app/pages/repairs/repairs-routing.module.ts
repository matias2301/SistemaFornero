import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListRepairsComponent } from './list-repairs/list-repairs.component';
import { ManageRepairsComponent } from './manage-repairs/manage-repairs.component';

export const routes = [  
  { path: 'list-repairs', component: ListRepairsComponent },  
  { path: 'manage-repairs', component: ManageRepairsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairsRoutingModule { }
