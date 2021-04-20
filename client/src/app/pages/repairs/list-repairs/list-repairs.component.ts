import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Sort} from "@angular/material/sort";

import { ManageDataService } from '../../../services/manage-data.service';
import { AlertsService } from '../../../services/alerts.service';

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
  addRepair = {
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

  addReapir() {    
    this.router.navigateByUrl('repairs/manage-repairs');
  }
  editReapir(repair: any) {
    this._manageDataService.getDataById('repairs', repair.id)
      .subscribe((res: any) => {        
          this.router.navigate(['repairs/manage-repairs', res]);        
      }, ( err ) => {        
        console.log(err)
      }
    );
  }
  deleteReapir(repair: any) {

    this._manageDataService.deleteRecord('repairs', repair.id)
      .subscribe((res: any) => {

        if( res.success ){            
          this._alertsService.alertToast(res.msg, 'success')
          this.repairsRows = this.repairsRows.filter(item => item.id !== repair.id)    
        }
      }, ( err ) => {

          let errorMsg = '';          
          if( err.error ){
            errorMsg = err.error.msg
          } else {
            errorMsg = 'Something went wrong'
          }

          this._alertsService.alertToast(errorMsg, 'error');
      }
    ); 
  }

  initializeColumns(): void {
    this.repairsColumns = [
      {
        name: 'ClientName',
        dataKey: 'clientFirstName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'LastName',
        dataKey: 'clientLastName',
        position: 'left',
        isSortable: true
      },
      {
        name: 'Subject',
        dataKey: 'subject',
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
        name: 'Assigned',
        dataKey: 'assigned',
        position: 'left',
        isSortable: false
      },
      {
        name: 'Created',
        dataKey: 'createdAt',
        position: 'left',
        isSortable: false
      },
    ];
  }

  getRepairs() {
    this._manageDataService.getData('repairs')
    .subscribe((res: any) => {
      if( res.repairs.length > 0 ){
        res.repairs.map( repair => {               
            this.addRepair = {
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
            this.repairsRows.push(this.addRepair);              
        });      
      }
      this.loading = false;
    });
  }

}
