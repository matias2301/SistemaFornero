import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Sort} from "@angular/material/sort";

import { ManageDataService } from '../../../services/manage-data.service';
import { ColumnTable } from '../../../interfaces/columnTable';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  productsColumns: ColumnTable[];
  productsRows: Product[];
  loading: boolean = true

  constructor(
    private _manageDataService: ManageDataService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initializeColumns();
    this.getproducts();
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.productsRows = this.productsRows.sort((a: Product, b: Product) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.productsRows = this.productsRows.sort((a: Product, b: Product) => b[keyName].localeCompare(a[keyName]));
    } else {
      this.getproducts();
    }
  }

  addProduct() {    
    this.router.navigateByUrl('products/manage-products');
  }
  editProduct(product: Product) {
    // this.productsRows = this.productsRows.filter(item => item.id !== product.id)
    console.log('editProduct',product)
  }
  deleteProduct(product: Product) {
    // this.productsRows = this.productsRows.filter(item => item.id !== product.id)
    console.log('deleteProduct',product)
  }

  initializeColumns(): void {
    this.productsColumns = [
      {
        name: 'Code',
        dataKey: 'code',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Descrip.',
        dataKey: 'description',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Price',
        dataKey: 'price',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Stock',
        dataKey: 'stock',
        position: 'left',
        isSortable: true
      },
    ];
  }

  getproducts() {
    this._manageDataService.getData('products')
    .subscribe((res: any) => {      
      this.productsRows = res.products;
      this.loading = false;
    });
  }

}