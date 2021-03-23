import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeMaterialModule } from './home-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeMaterialModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
