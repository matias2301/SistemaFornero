import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';


const materialModules = [  
  MatCardModule,
  MatButtonModule,  
  MatCheckboxModule,  
  MatIconModule,
  MatInputModule,  
  MatFormFieldModule,  
  MatStepperModule
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

export class LoginMaterialModule { }