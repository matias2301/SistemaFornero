import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Sort} from "@angular/material/sort";

import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';

import { ColumnTable } from '../../../interfaces/columnTable';
import { Provider } from '../../../interfaces/provider.interface';

@Component({
  selector: 'app-list-providers',
  templateUrl: './list-providers.component.html',
  styleUrls: ['./list-providers.component.css']
})
export class ListProvidersComponent implements OnInit {

  providersColumns: ColumnTable[];
  providersRows: Provider[];
  loading: boolean = true

  constructor(
    private _manageDataService: ManageDataService,
    private _alertsService: AlertsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initializeColumns();
    this.getProviders();
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.providersRows = this.providersRows.sort((a: Provider, b: Provider) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.providersRows = this.providersRows.sort((a: Provider, b: Provider) => b[keyName].localeCompare(a[keyName]));
    } else {
      this.getProviders();
    }
  }

  addProvider() {    
    this.router.navigateByUrl('providers/manage-providers');
  }
  editProvider(provider: Provider) {
    this._manageDataService.getDataById('providers', provider.id)
      .subscribe((res: Provider) => {        
          this.router.navigate(['providers/manage-providers', res]);        
      }, ( err ) => {        
        console.log(err)
      }
    );
  }
  deleteProvider(provider: Provider) {

    this._manageDataService.deleteRecord('providers', provider.id)
      .subscribe((res: any) => {

        if( res.success ){            
          this._alertsService.alertToast(res.msg, 'success')
          this.providersRows = this.providersRows.filter(item => item.id !== provider.id)    
        }
      }, ( err ) => {

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

  initializeColumns(): void {
    this.providersColumns = [
      {
        name: 'Nombre',
        dataKey: 'name',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Apellido',
        dataKey: 'lastName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Email',
        dataKey: 'email',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Telefóno',
        dataKey: 'phone',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Ciudad',
        dataKey: 'city',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Provincia',
        dataKey: 'state',
        position: 'left',
        isSortable: false
      },
      {
        name: 'País',
        dataKey: 'country',
        position: 'left',
        isSortable: false
      },
    ];
  }

  getProviders() {
    this._manageDataService.getData('providers')
    .subscribe((res: any) => {      
      this.providersRows = res.providers;
      this.loading = false;
    });
  }

}