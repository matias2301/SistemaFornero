import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../../services/auth.service';

import { Product } from '../../../interfaces/product.interface';
import { MontoPipe } from '../../../pipes/monto.pipe'
import { MilesPipe } from '../../../pipes/miles.pipe';

interface codeProduct {
  code: string;
  descrip: string;
}

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})

export class ManageProductsComponent implements OnInit {

  productForm: FormGroup;  
  product: any;
  edit: boolean = false;
  products: codeProduct[] = [
    {code: 'p-001', descrip: 'description product 1'},
    {code: 'p-002', descrip: 'description product 2'},
    {code: 'p-003', descrip: 'description product 3'},
    {code: 'p-004', descrip: 'description product 4'},
    {code: 'p-005', descrip: 'description product 5'},
    {code: 'p-006', descrip: 'description product 6'},
    {code: 'p-007', descrip: 'description product 7'},
  ];

  constructor(
    public formBuilder: FormBuilder,
    private _manageDataService: ManageDataService,
    private _alertsService: AlertsService,
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,   
    private montoPipe: MontoPipe, 
    private milesPipe: MilesPipe, 
  ) {
    this.createForm();

    this.router.events.subscribe((ev: any) => {
      if (ev.url === '/products/manage-products') {
        this.productForm.reset();
        this.edit = false;
      }
    })
  }


  ngOnInit() {
    this.product = this.activatedRoute.snapshot.params;
    if( this.product.id ){
      this.edit = true;
      this.loadForm();      
    }
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      code: new FormControl('', Validators.compose([Validators.required ])),
      description: new FormControl('', Validators.compose([Validators.required ])),
      price: new FormControl('', Validators.compose([Validators.required ])),
      stock: new FormControl('', Validators.compose([Validators.required ])),
    });
  }

  loadForm() {
    this.productForm.reset({
      code: this.product.code,
      description: this.product.description,
      price: this.milesPipe.transform(this.product.price.replace('.', ',')),
      stock: this.milesPipe.transform(this.product.stock),
    });
  }

  setDescription(descrip: string) {
    this.productForm.controls.description.setValue(descrip);  
  }

  validateNumber(ev: any, decimal: boolean) {
    if( !/^\d+$/.test(ev.key) && ev.keyCode != 8 && ev.keyCode != 9 && ev.keyCode != 37 && ev.keyCode != 39 && ev.keyCode != 46 && ev.keyCode != 188 ) ev.preventDefault();
    if (decimal) {
      const price = this.productForm.controls.price.value || '';      
      if ( /^\d+$/.test(ev.key) && price.split(',')[1] && price.split(',')[1].length > 1) ev.preventDefault();
    }
    else if (ev.keyCode == 188) ev.preventDefault();
  }

  formatNumber(field: string) {
    if (field == 'price' && this.productForm.controls.price.value) {
      const formattedNumber = this.montoPipe.transform(this.productForm.controls.price.value.replace(',', '.'));
      this.productForm.controls.price.patchValue(formattedNumber)
    }
    if (field == 'stock' && this.productForm.controls.stock.value) {
      const formattedNumber = this.milesPipe.transform(this.productForm.controls.stock.value);
      this.productForm.controls.stock.patchValue(formattedNumber)
    }
  }

  onSubmit(values: Product) {
    if( this.productForm.invalid ){
      Object.values( this.productForm.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();          
        }
      });
      return
    }

    const stringPrice = String(values.price)
    values.price = Number(stringPrice.replace('.','').replace(',','.'));
    const stringStock = String(values.stock)
    values.stock = Number(stringStock.replace('.','').replace(',','.'));
    
    if( !this.edit) {
      this.addProduct(values)
    } else {
      this.updateProduct(values)
    }   
  }

  addProduct(values) {
    this._manageDataService.createRecord('products', values)
    .subscribe((res: any) => {
      
      if( res.success){            
        this._alertsService.alertToast(res.msg, 'success')
          .then( () => {
            this.productForm.reset();
          });
      } else {
        this._alertsService.alertToast(res.msg, 'error');
      }

    }, ( err ) => {
        if (err.error && err.error.code == 999) {
          this._authService.logout()
        }

        let errorMsg = '';        
        if( err.error.msg ){
          errorMsg = err.error.msg
        } else {
          errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
        }

        this._alertsService.alertToast(errorMsg, 'error');
      }                        
    );
  }

  updateProduct(values){
    this._manageDataService.updateRecord('products', this.product.id, values)
    .subscribe((res: any) => {
        this._alertsService.alertToast('¡El producto se agregó con éxito!', 'success')
          .then( () => {
            this.router.navigateByUrl('products/list-products');
            this.productForm.reset();
            this.edit = false;    
          });      

    }, ( err ) => {
        if (err.error && err.error.code == 999) {
          this._authService.logout()
        }
      
        let errorMsg = '';        
        if( err.error.msg ){
          errorMsg = err.error.msg
        } else {
          errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
        }

        this._alertsService.alertToast(errorMsg, 'error');
      }                        
    );
  }
}
