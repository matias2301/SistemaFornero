import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Sort} from "@angular/material/sort";

import { ManageDataService } from '../../../services/manage-data.service';
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
    // this.articlesRows = this.articlesRows.filter(item => item.id !== article.id)
    console.log('editarticle',article)
  }
  deleteArticle(article: Article) {
    // this.articlesRows = this.articlesRows.filter(item => item.id !== article.id)
    console.log('deletearticle',article)
  }

  initializeColumns(): void {
    this.articlesColumns = [
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

  getArticles() {
    this._manageDataService.getData('articles')
    .subscribe((res: any) => {      
      this.articlesRows = res.articles;
      this.loading = false;
    });
  }

}