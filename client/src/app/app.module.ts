import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BreadcrumbModule } from './components/breadcrumb/breadcrumb.module';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
    MenuListItemComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    HttpClientModule,  
    BreadcrumbModule       
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
