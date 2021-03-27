import { Routes } from '@angular/router';

import { ClientsComponent } from '../clients/clients.component';
import { ArticlesComponent } from '../articles/articles.component';
import { ProductsComponent } from '../products/products.component';
import { ProvidersComponent } from '../providers/providers.component';
import { RepairsComponent } from '../repairs/repairs.component';

export const HOME_CHILDREN: Routes = [
      {
        path: 'clients',
        component: ClientsComponent        
      },
      {
        path: 'providers',
        component: ProvidersComponent        
      },
      {
        path: 'products',
        component: ProductsComponent        
      },
      {
        path: 'repairs',
        component: RepairsComponent              
      },
      {
        path: 'articles',
        component: ArticlesComponent        
      }
];