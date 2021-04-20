import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeMaterialModule } from './home-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent    
  ],
  imports: [
    CommonModule,    
    HomeMaterialModule,
    FlexLayoutModule,    
    FormsModule,
    ReactiveFormsModule       
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
