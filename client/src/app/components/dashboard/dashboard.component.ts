import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  report?: string;
  title = 'Seleccioná uno de los informes del listado';

  constructor() { }

  ngOnInit(): void { }

  onValChange(report: string) {
    switch (report) {
      case 'stocks':
        this.title = 'Informe de artículos con faltantes';
        break;
      case 'repairs':
        this.title = 'Informe de reparaciones';
        break;
      case 'paids':
        this.title = 'Informe de clientes con confirmación de pago pendiente';
        break;
    }

  }

}
