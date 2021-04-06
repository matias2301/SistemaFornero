import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { TableModule } from '../../components/table/table.module';
import { AngularMaterialModule } from './product-material.module'

@NgModule({
  declarations: [ListProductsComponent, ManageProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule   
  ]
})
export class ProductsModule { }
