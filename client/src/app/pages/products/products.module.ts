import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { TableModule } from '../../components/table/table.module';


@NgModule({
  declarations: [ListProductsComponent, ManageProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableModule   
  ]
})
export class ProductsModule { }
