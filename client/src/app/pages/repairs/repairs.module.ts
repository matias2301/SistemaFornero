import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairsRoutingModule } from './repairs-routing.module';
import { RepairsComponent } from './repairs.component';


@NgModule({
  declarations: [RepairsComponent],
  imports: [
    CommonModule,
    RepairsRoutingModule
  ]
})
export class RepairsModule { }
