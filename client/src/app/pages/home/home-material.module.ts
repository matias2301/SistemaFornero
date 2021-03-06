import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

const materialModules = [
  MatSidenavModule,
  MatListModule,
  MatButtonModule, 
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatCheckboxModule
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