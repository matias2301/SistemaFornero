import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Sort} from "@angular/material/sort";

import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../../services/auth.service';

import { ColumnTable } from '../../../interfaces/columnTable';
import { Article } from '../../../interfaces/article.interface';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {  

  articlesColumns: ColumnTable[];
  articlesRows: Article[];
  loading: boolean = true

  constructor(
    private _manageDataService: ManageDataService,
    private _alertsService: AlertsService,
    private _authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initializeColumns();
    this.getArticles();
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.articlesRows = this.articlesRows.sort((a: Article, b: Article) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.articlesRows = this.articlesRows.sort((a: Article, b: Article) => b[keyName].localeCompare(a[keyName]));
    } else {
      this.getArticles();
    }
  }

  addArticle() {    
    this.router.navigateByUrl('articles/manage-articles');
  }

  editArticle(article: Article) {
    this._manageDataService.getDataById('articles', article.id)
      .subscribe((res: Article) => {        
          this.router.navigate(['articles/manage-articles', res]);        
      }, ( err ) => {        
        console.log(err)
      }
    );
  }

  async deleteArticle(article: Article) {
    const confirm = await this._alertsService.alertModal('Confirmar eliminación', `Se eliminará el artículo "${article.description}"`, 'warning')

    if (confirm) {
      this._manageDataService.deleteRecord('articles', article.id)
        .subscribe((res: any) => {

          if( res.success ){            
            this._alertsService.alertToast(res.msg, 'success')
            this.articlesRows = this.articlesRows.filter(item => item.id !== article.id)    
          }
        }, ( err ) => {      
          if (err.error && err.error.code == 999) {
            this._authService.logout()
          }    

          let errorMsg = '';          
          if( err.error ){
            errorMsg = err.error.msg
          } else {
            errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
          }

          this._alertsService.alertToast(errorMsg, 'error');
        }
      );
    }
  }

  initializeColumns(): void {
    this.articlesColumns = [
      {
        name: 'Código',
        dataKey: 'code',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Descripción',
        dataKey: 'description',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Precio',
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
      {
        name: 'Punto de pedido',
        dataKey: 'poo',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Provedor',
        dataKey: 'Providers',
        position: 'left',
        isSortable: true
      }
    ];
  }

  getArticles() {
    this._manageDataService.getData('articles')
    .subscribe((res: any) => {
      this.articlesRows = res.articles;
      this.loading = false;
    });
  }

}