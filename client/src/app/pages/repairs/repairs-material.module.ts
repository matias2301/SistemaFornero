import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

const materialModules = [
  MatButtonModule, 
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatTableModule,
  MatChipsModule  
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

export class AngularMaterialModule { }