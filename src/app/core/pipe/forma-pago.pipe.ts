import { Pipe, PipeTransform } from '@angular/core';
import { FORMA_PAGO } from '../Constantes';

@Pipe({
  name: 'formaPago'
})
export class FormaPagoPipe implements PipeTransform {

  transform(value: number | undefined): string {
    const val = Number(value);
    switch (val){
      case FORMA_PAGO.EFECTIVO: return 'Contado';
      case FORMA_PAGO.TRANSFERENCIA: return 'Transferencia';
      case FORMA_PAGO.ABONOS: return 'Venta en abonos';
      default: return '--';
    }
  }
}
