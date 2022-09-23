import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'monto'
})
@Injectable({
  providedIn: 'root'
})

export class MontoPipe implements PipeTransform {

  transform(value: any, decimals = 2) {
    if (value === 0) {
      return '0,00';
    }

    if (value == null || value == '') {
      return '0,00';
    }

    if (value === '---') {
      return '---';
    }

    const valorSeparado = String(value).split('.');
    if (decimals <= 0) {
     return Number(valorSeparado[0]);
    }

    const delimitadorMiles = '.';
    const delimitadorDecimales = ',';

    if (valorSeparado[1] == undefined) {
      valorSeparado[1] = '';
    }

    const enteros = valorSeparado[0].split('').reverse();

    let i = 0;
    let enterosFormateados = '';
    enteros.map(e => {
      if (i % 3 == 0 && i !== 0 && e !== '-') {
        if (!(enteros.length == i)) {
          enterosFormateados = delimitadorMiles + enterosFormateados;
        }
      }
      enterosFormateados = e + enterosFormateados;
      i++;
    });

    const decimales = valorSeparado[1].split('');

    let decimalesFormateados = '';
    decimales.map((d, index) => {
      if (index < decimals) {
        decimalesFormateados += d;
      }
    });

    let decimalesPadEnd = '';
    if (decimalesFormateados.length < decimals) {
      const decimalesFaltantes = decimals - decimalesFormateados.length;
      decimalesPadEnd = new Array(decimalesFaltantes).fill(0).join('');
    }

    decimalesFormateados += decimalesPadEnd;

    return enterosFormateados + delimitadorDecimales + decimalesFormateados;
  }

}