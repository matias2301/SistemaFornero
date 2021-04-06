import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Sort} from "@angular/material/sort";

import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';

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
    private _alertsService: AlertsService,
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
    this._manageDataService.getDataById('products', product.id)
      .subscribe((res: Product) => {        
          this.router.navigate(['products/manage-products', res]);        
      }, ( err ) => {        
        console.log(err)
      }
    );
  }
  deleteProduct(product: Product) {
    this._manageDataService.deleteRecord('products', product.id)
      .subscribe((res: any) => {

        if( res.success ){            
          this._alertsService.alertToast(res.msg, 'success')
          this.productsRows = this.productsRows.filter(item => item.id !== product.id)    
        }
      }, ( err ) => {
        
          let errorMsg = '';          
          if( err.error ){
            errorMsg = err.error.msg
          } else {
            errorMsg = 'Something went wrong'
          }

          this._alertsService.alertToast(errorMsg, 'error');
      }
    );
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