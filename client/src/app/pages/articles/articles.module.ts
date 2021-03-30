import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ManageArticlesComponent } from './manage-articles/manage-articles.component';


@NgModule({
  declarations: [ListArticlesComponent, ManageArticlesComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
