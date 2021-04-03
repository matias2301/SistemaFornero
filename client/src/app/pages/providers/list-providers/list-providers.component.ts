import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Sort} from "@angular/material/sort";

import { ManageDataService } from '../../../services/manage-data.service';
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
    // this.providersRows = this.providersRows.filter(item => item.id !== provider.id)
    console.log('editProvider', provider)
  }
  deleteProvider(provider: Provider) {
    // this.providersRows = this.providersRows.filter(item => item.id !== provider.id)
    console.log('deleteProvider', provider)
  }

  initializeColumns(): void {
    this.providersColumns = [
      {
        name: 'Name',
        dataKey: 'name',
        position: 'left',
        isSortable: true
      },
      {
        name: 'LastName',
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
        name: 'Phone',
        dataKey: 'phone',
        position: 'left',
        isSortable: false
      },
      {
        name: 'City',
        dataKey: 'city',
        position: 'left',
        isSortable: false
      },
      {
        name: 'State',
        dataKey: 'state',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Country',
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