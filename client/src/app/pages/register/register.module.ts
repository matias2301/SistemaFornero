import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterMaterialModule } from './register-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    RegisterMaterialModule,
    FlexLayoutModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterModule { }
