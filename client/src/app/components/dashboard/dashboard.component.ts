import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ReportsService } from '../../services/reports.services';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-dashboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  report?: string;
  title = 'Seleccioná uno de los informes del listado';

  constructor(
    private _reportsService: ReportsService,
    private _alertsService: AlertsService,
  ) { }

  ngOnInit(): void { }

  onValChange(report: string) {
    switch (report) {
      case 'stocks':
        this.title = 'Informe de artículos con faltantes';
        this.getLackingArticlesReport();
        break;
      case 'repairs':
        this.title = 'Informe de reparaciones';
        this.getRepairsReport();
        break;
      case 'paids':
        this.title = 'Informe de clientes con confirmación de pago pendiente';
        this.getPendingPaidsReport();
        break;
    }
  }


  getLackingArticlesReport() {
    this._reportsService.getLackingArticles()
    .subscribe((res: any) => {        
      console.log('lacking_articles', res)
    }, () => {
      let errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
      this._alertsService.alertToast(errorMsg, 'error');
      }                        
    );
  }


  getRepairsReport() {
    this._reportsService.getRepairs()
    .subscribe((res: any) => {        
      console.log('getRepairsReport', res)
    }, () => {
      let errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
      this._alertsService.alertToast(errorMsg, 'error');
      }                        
    );
  }

  getPendingPaidsReport() {
    this._reportsService.getPendingPaids()
    .subscribe((res: any) => {        
      console.log('getPendingPaidsReport', res)
    }, () => {
      let errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
      this._alertsService.alertToast(errorMsg, 'error');
      }                        
    );
  }

}
