import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ManageArticlesComponent } from './manage-articles/manage-articles.component';
import { TableModule } from '../../components/table/table.module';
import { AngularMaterialModule } from './article-material.module'

@NgModule({
  declarations: [ListArticlesComponent, ManageArticlesComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    TableModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArticlesModule { }
