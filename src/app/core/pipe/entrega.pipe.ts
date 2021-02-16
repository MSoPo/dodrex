import { Pipe, PipeTransform } from '@angular/core';
import { ENTREGA } from '../Constantes';

@Pipe({
  name: 'entrega'
})
export class EntregaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const val = Number(value);
    switch (val){
      case ENTREGA.ENTRAGADO: return 'Entregado';
      case ENTREGA.ENVIO: return 'Enviar';
      case ENTREGA.RECOGER: return 'Recoger en tienda';
      default: return 'Entregado'
    }
  }

}
