import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Sort} from "@angular/material/sort";

import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../../services/auth.service';

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
    private _alertsService: AlertsService,
    private _authService: AuthService,
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
    this._manageDataService.getDataById('clients', client.id)
      .subscribe((res: Client) => {        
          this.router.navigate(['clients/manage-clients', res]);        
      }, ( err ) => {        
        console.log(err)
      }
    );
  }

  async deleteClient(client: Client) {
    const confirm = await this._alertsService.alertModal('Confirmar eliminación', `Se eliminará el cliente ${client.firstName} ${client.lastName}`, 'warning')
    
    if (confirm) {
      this._manageDataService.deleteRecord('clients', client.id)
        .subscribe((res: any) => {

          if( res.success ){            
            this._alertsService.alertToast(res.msg, 'success')
            this.clientsRows = this.clientsRows.filter(item => item.id !== client.id)    
          }
        }, ( err ) => {       
          if (err.error && err.error.code == 999) {
            this._authService.logout()
          }   

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
  }

  initializeColumns(): void {
    this.clientsColumns = [
      {
        name: 'Nombre',
        dataKey: 'firstName',
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
        isSortable: true
      },
      {
        name: 'Telefóno',
        dataKey: 'phone',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Calle',
        dataKey: 'streetName',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Número',
        dataKey: 'streetNumber',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Ciudad',
        dataKey: 'city',
        position: 'left',
        isSortable: true
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