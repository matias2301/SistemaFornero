import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ManageArticlesComponent } from './manage-articles/manage-articles.component';
import { TableModule } from '../../components/table/table.module';

@NgModule({
  declarations: [ListArticlesComponent, ManageArticlesComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    TableModule
  ]
})
export class ArticlesModule { }
