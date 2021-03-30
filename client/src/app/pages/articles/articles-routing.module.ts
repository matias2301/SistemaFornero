import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ManageArticlesComponent } from './manage-articles/manage-articles.component';

export const routes = [  
  { path: 'list-articles', component: ListArticlesComponent },  
  { path: 'manage-articles', component: ManageArticlesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
