import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { ReportsService } from '../../services/reports.services';
import { AlertsService } from '../../services/alerts.service';

// import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';

// import DataLabelsPlugin from 'chartjs-plugin-datalabels';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-dashboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // public barChartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   scales: {
  //     x: {},
  //     y: {
  //       min: 0
  //     }
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //     },
  //     datalabels: {
  //       anchor: 'end',
  //       align: 'end'
  //     }
  //   },
  //   aspectRatio: 1.5,    
  // };
  // public barChartType: ChartType = 'bar';
  // public barChartPlugins = [
  //   DataLabelsPlugin
  // ];
  // public barChartData: ChartData<'bar'>[] = [];

  // events
  // public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  initColumns = [];
  displayedColumns = [];
  columnsToDisplay = [];
  data: any[] = [];
  // generarReporte = false;


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
    this.initColumns = [];
    this.displayedColumns = [];
    this.columnsToDisplay = [];

    this.initColumns = [
      {
        nombre: 'Artículo',
        checked: true,
      },
      {
        nombre: 'Descripción',
        checked: true,
      },
      {
        nombre: 'Stock',
        checked: true,
      },
      {
        nombre: 'Punto_Pedido',
        checked: true,
      },
      {
        nombre: 'Precio',
        checked: true,
      },
      {
        nombre: 'Proveedor',
        checked: false,
      },
      {
        nombre: 'Email',
        checked: false,
      },
      {
        nombre: 'Teléfono',
        checked: false,
      }
    ];
    this.displayedColumns = this.initColumns.map(col => col.nombre);
    this.initColumns.forEach(col => {
      if (col.checked) this.columnsToDisplay.push(col.nombre)
    })

    this._reportsService.getLackingArticles()    
      .subscribe((res: any) => {
        if (res) {
          console.log('lacking_articles', res)
          this.data = [];
          res.articles.forEach((article: any) => {
            const newRecord: any = {
              Artículo: article.code,
              Descripción: article.description,
              Stock: article.stock,
              Punto_Pedido: article.poo,
              Precio: article.price,
              Proveedor: article.Providers[0]?.name + ' ' + article.Providers[0]?.lastName,
              Email: article.Providers[0]?.email,
              Teléfono: article.Providers[0]?.phone,
            };

            this.data.push(newRecord)
          });

          // this.barChartData = [];

          // res.articles.forEach((article: any) => {
          //   const newArticle: any = {
          //     labels: [article.description],
          //     datasets: [
          //       { data: [article.stock], label: 'Stock actual' },
          //       { data: [article.poo], label: 'Punto de pedido' }
          //     ]
          //   };

          //   this.barChartData.push(newArticle)
          // });

          // console.log('this.barChartData', this.barChartData)
          // this.chart?.update();
        } else {
          let errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
          this._alertsService.alertToast(errorMsg, 'error');
        }
      });
  }


  getRepairsReport() {
    this.initColumns = [];
    this.displayedColumns = [];
    this.columnsToDisplay = [];

    this.initColumns = [
      {
        nombre: 'Nombre_cliente',
        checked: true,
      },
      {
        nombre: 'Motivo',
        checked: true,
      },
      {
        nombre: 'Fecha_ingreso',
        checked: true,
      },
      {
        nombre: 'Fecha_estimada',
        checked: true,
      },
      {
        nombre: 'Estado',
        checked: true,
      },
      {
        nombre: 'Asignado',
        checked: true,
      },
      {
        nombre: 'Ingresado',
        checked: true,
      },
      {
        nombre: 'Presupuesto',
        checked: true,
      },
      {
        nombre: 'Observaciones',
        checked: false,
      },
      {
        nombre: 'Artículos',
        checked: false,
      },
    ];
    this.displayedColumns = this.initColumns.map(col => col.nombre);
    this.initColumns.forEach(col => {
      if (col.checked) this.columnsToDisplay.push(col.nombre)
    })

    
    this._reportsService.getRepairs()
      .subscribe((res: any) => {
        if (res) {
          console.log('repairs', res)
          this.data = [];
          res.repairs.forEach((repair: any) => {
            const fecha_ingreso = new Date(repair.createdAt);
            const fecha_ingreso_formateada = fecha_ingreso.getDate()  + "/" + (fecha_ingreso.getMonth()+1) + "/" + fecha_ingreso.getFullYear();
            const fecha_finalizacion = new Date(repair.estDate);
            const fecha_finalizacion_formateada = fecha_finalizacion.getDate()  + "/" + (fecha_finalizacion.getMonth()+1) + "/" + fecha_finalizacion.getFullYear()

            const newRecord: any = {
              Nombre_cliente: repair.Client.firstName + ' ' + repair.Client.lastName,
              Motivo: repair.description,
              Fecha_ingreso: fecha_ingreso_formateada,
              Fecha_estimada: fecha_finalizacion_formateada,
              Estado: repair.state,
              Asignado: repair.assigned.name,
              Ingresado: repair.taken.name,
              Presupuesto: repair.budget,
              Observaciones: repair.Observations[0]?.description,
              Artículos: repair.Articles[0] ? `${repair.Articles[0]?.description}(${repair.Articles[0]?.ArticlesRepairs.amount})` : null,
            };

            this.data.push(newRecord)
          });

        } else {
          let errorMsg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
          this._alertsService.alertToast(errorMsg, 'error');
        }
      });
  }


  getPendingPaidsReport() {
    this.initColumns = [];
    this.displayedColumns = [];
    this.columnsToDisplay = [];

    this.initColumns = [
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
        nombre: 'Fecha_ingreso',
        checked: true,
      },
      {
        nombre: 'Fecha_estimada',
        checked: true,
      },
    ];
    this.displayedColumns = this.initColumns.map(col => col.nombre);
    this.initColumns.forEach(col => {
      if (col.checked) this.columnsToDisplay.push(col.nombre)
    })

    this._reportsService.getPendingPaids()
      .subscribe((res: any) => {
        if (res) {
          this.data = [];
          res.pendingPaids.forEach((paid: any) => {
            const fecha_ingreso = new Date(paid.createdAt);
            const fecha_ingreso_formateada = fecha_ingreso.getDate()  + "/" + (fecha_ingreso.getMonth()+1) + "/" + fecha_ingreso.getFullYear();
            const fecha_finalizacion = new Date(paid.estDate);
            const fecha_finalizacion_formateada = fecha_finalizacion.getDate()  + "/" + (fecha_finalizacion.getMonth()+1) + "/" + fecha_finalizacion.getFullYear()

            const newRecord: any = {
              Nombre_cliente: paid.Client.firstName,
              Apellido_cliente: paid.Client.lastName,
              Email: paid.Client.email,
              Teléfono: paid.Client.phone,
              Motivo: paid.description,
              Estado: paid.state,
              Presupuesto: paid.budget,
              Fecha_ingreso: fecha_ingreso_formateada,
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


  updateColumns(column: any) {
    column.checked = !column.checked
    this.columnsToDisplay = [];
    this.initColumns.forEach(col => {
      if (col.checked) this.columnsToDisplay.push(col.nombre)
    })
  }


  downloadReport() {
    const fechaActual = new Date();
    const fechaActualFormateada = fechaActual.getDate()  + "/" + (fechaActual.getMonth()+1) + "/" + fechaActual.getFullYear();
   
    let pdfReport = document.getElementById('pdfReport');

    const p = document.createElement("p")
    p.textContent = `Generado el dia: ${fechaActualFormateada}`;
    pdfReport.insertAdjacentElement("afterbegin", p); 

    const div = document.createElement("div");
    div.textContent = this.title;
    pdfReport.insertAdjacentElement("afterbegin", div);   

    var html = htmlToPdfmake(pdfReport.innerHTML);
      
    const documentDefinition = { content: html, pageOrientation: 'landscape' };
    pdfMake.createPdf(documentDefinition).open(); 
    // pdfMake.createPdf(documentDefinition).download();

    div.remove();
    p.remove();
  }
}
