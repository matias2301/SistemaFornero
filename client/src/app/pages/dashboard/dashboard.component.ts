import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { ReportsService } from '../../services/reports.services';
import { AlertsService } from '../../services/alerts.service';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    },
    aspectRatio: 1.5,    
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];
  public barChartData: ChartData<'bar'>[] = [];
    // [
    //   {
    //     labels: [],
    //     datasets: [
    //       { data: [], label: 'Stock actual' },
    //       { data: [], label: 'Punto de pedido' }
    //     ]
    //   }
    // ];



  // events
  // public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData.datasets[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     Math.round(Math.random() * 100),
  //     56,
  //     Math.round(Math.random() * 100),
  //     40 ];

  //   this.chart?.update();
  // }
  

  initColumns = [
    {
      nombre: 'Nombre_cliente',
      checked: true,
    },
    {
      nombre: 'Apellido_cliente',
      checked: true,
    },
    {
      nombre: 'Email',
      checked: true,
    },
    {
      nombre: 'Teléfono',
      checked: true,
    },
    {
      nombre: 'Motivo',
      checked: true,
    },
    {
      nombre: 'Estado',
      checked: true,
    },
    {
      nombre: 'Presupuesto',
      checked: false,
    },
    {
      nombre: 'Fecha_Ingreso',
      checked: true,
    },
    {
      nombre: 'Fecha_estimada',
      checked: true,
    },
  ];

  displayedColumns = this.initColumns.map(col => col.nombre);
  columnsToDisplay = this.displayedColumns.slice();
  data: any[] = [];


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
        if (res) {
          console.log('lacking_articles', res)
          this.barChartData = [];

          res.articles.forEach((article: any) => {
            const newArticle: any = {
              labels: [article.description],
              datasets: [
                { data: [article.stock], label: 'Stock actual' },
                { data: [article.poo], label: 'Punto de pedido' }
              ]
            };

            this.barChartData.push(newArticle)
          });

          console.log('this.barChartData', this.barChartData)
          this.chart?.update();
        } else {
          let errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
          this._alertsService.alertToast(errorMsg, 'error');
        }
      });
  }

  getRepairsReport() {
    this._reportsService.getRepairs()
      .subscribe((res: any) => {
        if (res) {
          console.log('lacking_articles', res)
        } else {
          let errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
          this._alertsService.alertToast(errorMsg, 'error');
        }
      });
  }

  getPendingPaidsReport() {
    this._reportsService.getPendingPaids()
      .subscribe((res: any) => {
        if (res) {
          console.log('lacking_articles', res)
          this.data = [];

          res.pendingPaids.forEach((paid: any) => {
            const fecha_ingreso = new Date(paid.createdAt);
            const fecha_ingreso_formateada = fecha_ingreso.getDate()  + "-" + (fecha_ingreso.getMonth()+1) + "-" + fecha_ingreso.getFullYear();
            const fecha_finalizacion = new Date(paid.estDate);
            const fecha_finalizacion_formateada = fecha_finalizacion.getDate()  + "-" + (fecha_finalizacion.getMonth()+1) + "-" + fecha_finalizacion.getFullYear()

            const newRecord: any = {
              Nombre_cliente: paid.Client.firstName,
              Apellido_cliente: paid.Client.lastName,
              Email: paid.Client.email,
              Teléfono: paid.Client.phone,
              Motivo: paid.description,
              Estado: paid.state,
              Presupuesto: paid.budget,
              Fecha_Ingreso: fecha_ingreso_formateada,
              Fecha_estimada: fecha_finalizacion_formateada,
            };

            this.data.push(newRecord)
          });
        } else {
          let errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
          this._alertsService.alertToast(errorMsg, 'error');
        }
      });
  }



  // addColumn() {
  //   const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
  //   this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  // }

  // removeColumn() {
  //   if (this.columnsToDisplay.length) {
  //     this.columnsToDisplay.pop();
  //   }
  // }
}
