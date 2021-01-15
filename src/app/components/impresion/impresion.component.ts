import { Component, OnInit } from '@angular/core';
import * as print from 'print-js';
import { CLIENTEACTUAL, EMPRESA, ESTILO_NOTA, ESTILO_TICKET, VENTAACTUAL } from 'src/app/core/Constantes';

@Component({
  selector: 'app-impresion',
  templateUrl: './impresion.component.html',
  styleUrls: ['./impresion.component.scss']
})
export class ImpresionComponent implements OnInit {

  venta;
  empresa;
  cliente;
  fecha;

  constructor() { 
    this.venta = VENTAACTUAL;
    this.empresa = EMPRESA;
    this.cliente = CLIENTEACTUAL;
    if(this.venta.fecha.hasOwnProperty('nanoseconds')){
      this.fecha = this.venta.fecha.toDate();
    }else{
      this.fecha = this.venta.fecha;
    }
  }

  ngAfterViewInit(): void {
    if(this.empresa.impresion == 1) { this.imprimir(); }
    if(this.empresa.impresion == 2) { this.imprimirTicket(); }
  }

  ngOnInit(): void {
    console.log(VENTAACTUAL);
    console.log(this.empresa.razon_social);
  }

  imprimir(): void {
    print({
      printable: 'nota',
      type: 'html',
      css: [
        "assets/stylesNota.css",
        
      ]
      })
  }

  imprimirTicket(): void {
    print({
      printable: 'ticket',
      type: 'html',
      css: [
        "assets/stylesNota.css",
        
      ]
      })
  }

}
