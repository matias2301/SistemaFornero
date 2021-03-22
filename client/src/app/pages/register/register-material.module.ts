import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
// import { MatSelectModule } from '@angular/material/select';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatStepperModule
  // MatDividerModule,
  // MatProgressSpinnerModule,
  // MatSelectModule,
  // MatBadgeModule,
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

export class RegisterMaterialModule { }