import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [    
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    { path: 'register', loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterModule) },
    { path: 'forgot-pass', loadChildren: () => import('./pages/forgot-pass/forgot-pass.module').then( m => m.ForgotPassModule) },    
    {
        path: '',
        component: HomeComponent,
        children: [
          { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'clients', canActivate: [AuthGuard], loadChildren: () => import('./pages/clients/clients.module').then(m => m.ClientsModule) },
          { path: 'providers', canActivate: [AuthGuard], loadChildren: () => import('./pages/providers/providers.module').then(m => m.ProvidersModule) },
          { path: 'products', canActivate: [AuthGuard], loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
          { path: 'articles', canActivate: [AuthGuard], loadChildren: () => import('./pages/articles/articles.module').then(m => m.ArticlesModule) },
          { path: 'repairs', canActivate: [AuthGuard], loadChildren: () => import('./pages/repairs/repairs.module').then(m => m.RepairsModule) },
          { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }