import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../../services/auth.service';

import { Article } from '../../../interfaces/article.interface'
import { Provider } from '../../../interfaces/provider.interface';

interface codeArticle {
  code: string;
  descrip: string;
}

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.component.html',
  styleUrls: ['./manage-articles.component.css']
})

export class ManageArticlesComponent implements OnInit {

  articleForm: FormGroup; 
  article: any;
  providers: Provider[];
  edit: boolean = false;
  articles: codeArticle[] = [
    {code: 'ar-60', descrip: 'arandela 60mm'},
    {code: 'ar-70', descrip: 'arandela 70mm'},
    {code: 'to-60', descrip: 'tornillo 60mm'},
    {code: 'to-70', descrip: 'tornillo 70mm'},
    {code: 'to-80', descrip: 'tornillo 80mm'},
    {code: 'ca-00', descrip: 'cadena'},
    {code: 'fr-00', descrip: 'freno'},
  ];

  constructor(
    public formBuilder: FormBuilder,
    private _manageDataService: ManageDataService,
    private _alertsService: AlertsService,
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,    
  ) {
    this.getProviders();
    this.createForm();
  }

  ngOnInit() {
    this.article = this.activatedRoute.snapshot.params;
    if( this.article.id ){
      this.edit = true;
      this.loadForm();      
    }
  }

  createForm() {
    this.articleForm = this.formBuilder.group({
      code: new FormControl('', Validators.compose([Validators.required ])),
      description: new FormControl('', Validators.compose([Validators.required ])),
      price: new FormControl('', Validators.compose([Validators.required ])),
      providers: new FormControl(''),
      stock: new FormControl('', Validators.compose([Validators.required ])),
      poo: new FormControl('', Validators.compose([Validators.required ]))
    });
  }

  loadForm() {

    this.articleForm.reset({
      code: this.article.code,
      description: this.article.description,
      price: this.article.price,
      providers: this.article.provider,
      stock: this.article.stock,
      poo: this.article.poo
    });
  }

  getProviders() {
    this._manageDataService.getData('providers')
    .subscribe((res: any) => {      
      this.providers = res.providers;      
    });
  }

  setDescription(descrip: string) {
    this.articleForm.controls.description.setValue(descrip);
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