import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {MatButtonToggleModule} from '@angular/material/button-toggle';


const materialModules = [
  MatButtonToggleModule
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules
  ],
})

export class HomeMaterialModule { }