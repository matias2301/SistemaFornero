import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Sort} from "@angular/material/sort";

import { ManageDataService } from '../../../services/manage-data.service';
import { ColumnTable } from '../../../interfaces/columnTable';
import { Client } from '../../../interfaces/client.interface';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  clientsColumns: ColumnTable[];
  clientsRows: Client[];
  loading: boolean = true

  constructor(
    private _manageDataService: ManageDataService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initializeColumns();
    this.getClients();
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.clientsRows = this.clientsRows.sort((a: Client, b: Client) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.clientsRows = this.clientsRows.sort((a: Client, b: Client) => b[keyName].localeCompare(a[keyName]));
    } else {
      this.getClients();
    }
  }

  addClient() {    
    this.router.navigateByUrl('clients/manage-clients');
  }
  editClient(client: Client) {
    // this.clientsRows = this.clientsRows.filter(item => item.id !== client.id)
    console.log('editClient',client)
  }
  deleteClient(client: Client) {
    // this.clientsRows = this.clientsRows.filter(item => item.id !== client.id)
    console.log('deleteClient',client)
  }

  initializeColumns(): void {
    this.clientsColumns = [
      {
        name: 'FirstName',
        dataKey: 'firstName',
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
        name: 'St.Name',
        dataKey: 'streetName',
        position: 'left',
        isSortable: false
      },
      {
        name: 'St.Number',
        dataKey: 'streetNumber',
        position: 'left',
        isSortable: false
      },
      {
        name: 'City',
        dataKey: 'city',
        position: 'left',
        isSortable: false
      },
    ];
  }

  getClients() {
    this._manageDataService.getData('clients')
    .subscribe((res: any) => {      
      this.clientsRows = res.clients;
      this.loading = false;
    });
  }

}