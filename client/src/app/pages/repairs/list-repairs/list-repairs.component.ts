import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Sort} from "@angular/material/sort";

import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';
import { AuthService } from '../../../services/auth.service';

import { ColumnTable } from '../../../interfaces/columnTable';
// import { Repair } from '../../../interfaces/repair.interface';

@Component({
  selector: 'app-list-repairs',
  templateUrl: './list-repairs.component.html',
  styleUrls: ['./list-repairs.component.css']
})
export class ListRepairsComponent implements OnInit {

  repairsColumns: ColumnTable[];
  repairsRows: any[] = [];
  loading: boolean = true;
  newRepair = {
    idRepair: '',
    clientFirstName: '',
    clientLastName: '',
    clientEmail: '',
    subject: '',
    estDate: '',
    state: '',
    assigned: '',
    taken: '',
    observations: [],
    createdAt: '',
    updatedAt: '',
  }

  constructor(
    private _manageDataService: ManageDataService,
    private _alertsService: AlertsService,
    private _authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(){
    this.initializeColumns();
    this.getRepairs();
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.repairsRows = this.repairsRows.sort((a: any, b: any) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      this.repairsRows = this.repairsRows.sort((a: any, b: any) => b[keyName].localeCompare(a[keyName]));
    } else {
      this.getRepairs();
    }
  }

  addRepair() {    
    this.router.navigateByUrl('repairs/manage-repairs');
  }

  editRepair(repair: any) {        
    this.router.navigate(['repairs/manage-repairs', repair]);
  }

  async deleteRepair(repair: any) {
    const confirm = await this._alertsService.alertModal('Confirmar eliminación', 'Se eliminará la reparación seleccionada', 'warning')

    if (confirm) {
      this._manageDataService.deleteRecord('repairs', repair.idRepair)
        .subscribe((res: any) => {

          if( res.success ){            
            this._alertsService.alertToast(res.msg, 'success')
            this.repairsRows = this.repairsRows.filter(item => item.idRepair !== repair.idRepair)    
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
    this.repairsColumns = [
      {
        name: 'Nombre cliente',
        dataKey: 'clientFirstName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Apellido cliente',
        dataKey: 'clientLastName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Motivo',
        dataKey: 'subject',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Estado',
        dataKey: 'state',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Asignado a',
        dataKey: 'assigned',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Fecha ingreso',
        dataKey: 'createdAt',
        position: 'left',
        isSortable: true
      },
    ];
  }

  getRepairs() {
    this._manageDataService.getData('repairs')
    .subscribe((res: any) => {
      if( res.repairs.length > 0 ){
        
        res.repairs.map( repair => {               
            this.newRepair = {
              idRepair: repair.id,
              clientFirstName: repair.Client.firstName,
              clientLastName: repair.Client.lastName,
              clientEmail: repair.Client.email,
              subject: repair.description,
              estDate: repair.estDate,
              state: repair.state,
              assigned: repair.assigned.name,
              taken: repair.taken.name,
              observations: repair.Observations,
              createdAt: repair.createdAt.split('T')[0].split('-').reverse().join('-'),
              updatedAt: repair.updatedAt,
            } 
            this.repairsRows.push(this.newRepair);              
        });      
      }
      this.loading = false;
    });
  }

}
