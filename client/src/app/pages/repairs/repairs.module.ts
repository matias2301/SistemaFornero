import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairsRoutingModule } from './repairs-routing.module';
import { ListRepairsComponent } from './list-repairs/list-repairs.component';
import { ManageRepairsComponent } from './manage-repairs/manage-repairs.component';


@NgModule({
  declarations: [ListRepairsComponent, ManageRepairsComponent],
  imports: [
    CommonModule,
    RepairsRoutingModule
  ]
})
export class RepairsModule { }
