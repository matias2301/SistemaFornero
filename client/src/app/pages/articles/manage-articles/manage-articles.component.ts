import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../../services/auth.service';

import { Article } from '../../../interfaces/article.interface'
import { Provider } from '../../../interfaces/provider.interface';
import { MontoPipe } from '../../../pipes/monto.pipe'
import { MilesPipe } from '../../../pipes/miles.pipe';

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.component.html',
  styleUrls: ['./manage-articles.component.css']
})

export class ManageArticlesComponent implements OnInit {

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  articleForm: FormGroup; 
  article: any;
  articlesByProviders = [];
  providers: Provider[];
  edit: boolean = false;
  public disabled: boolean = false;
  public role = '';

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
    this.role = this._authService.authSubject.value.role;
    this.disabled = this.role != 'admin';

    this.getProviders();
    this.createForm();

    this.router.events.subscribe((ev: any) => {
      if (ev.url === '/articles/manage-articles') {
        this.articleForm.reset();
        this.edit = false;
      }
    })
  }

  ngOnInit() {
    const data: any = JSON.parse(this.activatedRoute.snapshot.paramMap.get('data'));
    
    if( data && data.article.id ){
      this.article = data.article;
      this.articlesByProviders = data.providers.map(prov => prov.id);
      this.edit = true;
      this.loadForm();      
    }
  }

  createForm() {
    this.articleForm = this.formBuilder.group({
      code: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      description: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      price: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      providers: new FormControl({value: '', disabled: this.disabled}),
      stock: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ])),
      poo: new FormControl({value: '', disabled: this.disabled}, Validators.compose([Validators.required ]))
    });
  }

  loadForm() {
    this.articleForm.reset({
      code: this.article.code,
      description: this.article.description,
      price: this.milesPipe.transform(String(this.article.price).replace('.', ',')),
      providers: this.article.provider,
      stock: this.milesPipe.transform(this.article.stock),
      poo: this.milesPipe.transform(this.article.poo)
    });

    this.articleForm.controls.providers.patchValue(this.articlesByProviders);
  }

  getProviders() {
    this._manageDataService.getData('providers')
    .subscribe((res: any) => {      
      this.providers = res.providers;
    });
  }

  // setDescription(descrip: string) {
  //   this.articleForm.controls.description.setValue(descrip);
  // }

  validateNumber(ev: any, decimal: boolean) {
    if( !/^\d+$/.test(ev.key) && ev.keyCode != 8 && ev.keyCode != 9 && ev.keyCode != 37 && ev.keyCode != 39 && ev.keyCode != 46 && ev.keyCode != 188 ) ev.preventDefault();
    if (decimal) {
      const price = this.articleForm.controls.price.value || '';      
      if ( /^\d+$/.test(ev.key) && price.split(',')[1] && price.split(',')[1].length > 1) ev.preventDefault();
    }
    else if (ev.keyCode == 188) ev.preventDefault();
  }

  formatNumber(field: string) {
    if (field == 'price' && this.articleForm.controls.price.value) {
      const formattedNumber = this.montoPipe.transform(this.articleForm.controls.price.value.replace(',', '.'));
      this.articleForm.controls.price.patchValue(formattedNumber)
    }
    if (field == 'stock' && this.articleForm.controls.stock.value) {
      const formattedNumber = this.milesPipe.transform(this.articleForm.controls.stock.value);
      this.articleForm.controls.stock.patchValue(formattedNumber)
    }
    if (field == 'poo' && this.articleForm.controls.poo.value) {
      const formattedNumber = this.milesPipe.transform(this.articleForm.controls.poo.value);
      this.articleForm.controls.poo.patchValue(formattedNumber)
    }
  }

  onSubmit(values: Article) {
    if( this.articleForm.invalid ){
      Object.values( this.articleForm.controls ).forEach( control => {
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
    const stringPoo = String(values.poo)
    values.poo = Number(stringPoo.replace('.','').replace(',','.'));

    if( !this.edit) {
      this.addArticle(values)
    } else {
      this.updateArticle(values)
    }
  }

  addArticle(values) {
    this._manageDataService.createRecord('articles', values)
    .subscribe((res: any) => {    

      if( res.success){            
        this._alertsService.alertToast('¡El artículo se agregó con éxito!', 'success')
          .then( () => {
            this.articleForm.reset();
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

  updateArticle(values) {
    this._manageDataService.updateRecord('articles', this.article.id, values)
    .subscribe((res: any) => {
        this._alertsService.alertToast('¡El artículo se modificó con éxito!', 'success')
          .then( () => {
            this.router.navigateByUrl('articles/list-articles');
            this.articleForm.reset();
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