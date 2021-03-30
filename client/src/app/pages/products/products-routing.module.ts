import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';

export const routes = [  
  { path: 'list-products', component: ListProductsComponent },  
  { path: 'manage-products', component: ManageProductsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
