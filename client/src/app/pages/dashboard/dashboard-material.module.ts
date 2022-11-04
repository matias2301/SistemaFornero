import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const materialModules = [
  MatButtonModule,
  MatButtonToggleModule,
  MatTableModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})

export class DashboardMaterialModule { }