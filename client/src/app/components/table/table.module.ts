import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { AngularMaterialModule } from './table-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { DataPropertyGetterPipe } from '../../pipes/data-property-getter.pipe'
import { MontoPipe } from '../../pipes/monto.pipe'
import { MilesPipe } from '../../pipes/miles.pipe'

@NgModule({
  declarations: [
    TableComponent,
    DataPropertyGetterPipe,
    MontoPipe,
    MilesPipe
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    MatSelectModule,
    MatFormFieldModule    
  ],
  exports: [TableComponent],
})
export class TableModule { }
