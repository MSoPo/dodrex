import { Pipe, PipeTransform } from '@angular/core';
import { TIPO_DESCUENTO } from '../Constantes';

@Pipe({
  name: 'tipoNomina'
})
export class TipoNominaPipe implements PipeTransform {

  transform(value: number): string {
    const val = Number(value);
    switch (val){
      case TIPO_DESCUENTO.SIN_DESCUENTO: return 'Sin descuento';
      case TIPO_DESCUENTO.PRECIO_ESPECIAL: return 'Precio Especial';
      default: return '--';
    }
  }

}
