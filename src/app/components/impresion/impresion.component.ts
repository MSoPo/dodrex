import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as print from 'print-js';
import { CLIENTEACTUAL, CONFIG, EMPRESA, PRODUCTOS, VENTAACTUAL } from 'src/app/core/Constantes';

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

  constructor(private router: Router) { 
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
    if(CONFIG.impresion){
      if(this.empresa.impresion == 1) { this.imprimir(); }
      if(this.empresa.impresion == 2) { this.imprimirTicket(); }
    }
    CONFIG.impresion = false;
    this.router.navigate([CONFIG.rutaRetorno]);
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
