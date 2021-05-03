import { Component, OnInit } from '@angular/core';
import { CONSORCIO } from 'src/app/cargaMasiva/consorcio1';
import { CONSROCIO2 } from 'src/app/cargaMasiva/consorcio2';
import { DOCA } from 'src/app/cargaMasiva/DOCA';
import { PAGARE } from 'src/app/cargaMasiva/pagares';
import { EMPRESA, PRODUCTOS } from 'src/app/core/Constantes';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ProductService } from 'src/app/core/services/product.service';
import { VentaService } from 'src/app/core/services/venta.service';
import { Venta } from 'src/app/models/Venta';
import { TereInventario } from '../../../cargaMasiva/tere';
import { Producto } from '../../../models/Producto'

@Component({
  selector: 'app-cargamasiva',
  templateUrl: './cargamasiva.component.html',
  styleUrls: ['./cargamasiva.component.scss']
})
export class CargamasivaComponent implements OnInit {

  constructor(private prodSer: ProductService, private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  /*cargarProd(): void{
    let cont = 0;
    EMPRESA.id = 'wHVk9389dFgkcE2wCGpc';
    this.prodSer.getAll()
    .then((r) => {
      console.log("Cargar Productos");
      r.forEach((e: any) => {
        const p: Producto = e.data();
        if(p.activo == false){
          cont++
          console.log(`${p.clave} : ${p.nombre}`);
        }
        /*if(p.fecha_creacion.toDate().getDay() == 2 && p.fecha_creacion.toDate().getMonth() == 1 ){
          console.log(p.clave);
          cont++;
          DOCA.forEach((con, idx) => {
            if(con.CLAVE == p.clave){
              this.prodSer.delete(p.clave);
              delete DOCA[idx];
            }
          });
        }*/
      /*});
      //console.log(DOCA);
      console.log(cont);
    })
  }*/

  cargarProd(): void{
    //copiar datos
    EMPRESA.id = 'SclgVdWKATPkDgCZwCQv';
    this.prodSer.getAll()
    .then((r) => {
      console.log("Cargar Productos");
      r.forEach((e: any) => {
        const p: Producto = e.data();
        EMPRESA.id = 'SclgVdWKATPkDgCZwCQv';
        p.cantidad = 10;
        p.cantidad_mayoreo = 10;
        this.prodSer.add(p);
      });
    })

  }

  /*cargarProd(): void{
    console.log(TereInventario);
    let carga = 0;
    TereInventario.forEach(pro => {
      /*if(carga > 20){
        return;
      }
      carga++;*//*
      const cantidad = pro['Cantidad'];
      let cant = Math.round(Number(cantidad));

      let clave:string = pro['codig'] + '';
      const nombre:string = pro['nombre'] + '';
      const precioUnitario:number = Number(pro['precioU']);
      const precioCompra:number = Number(pro['PrecioC']);
      const precioMayoreo:number = Number(pro['PrecioM']);
      const precioEspecial:number = Number(pro['PrecioE']);
      const cant_mayorio: number = Number(pro['CantidadM']);

      if(!clave || clave.length < 1){
        clave = new Date().getTime().toString();
      }
        const poducto: Producto  = {
          activo: true,
          cantidad: cant,
          cantidad_mayoreo: cant_mayorio,
          clave: clave,
          descripcion: '',
          favorito: false,
          fecha_creacion: new Date(),
          nombre: nombre.toLowerCase(),
          precio_compra: precioCompra,
          precio_unitario: precioUnitario,
          precio_mayoreo: precioMayoreo,
          precio_especial: precioEspecial,
          usuario: 'CARGAMASIVA',
          operacion: 'update',
          fecha_actualizacion: new Date(),
          fraccion: false
        }
        EMPRESA.id = '9NUR6IKTTQsby4nFxBfX';
        console.log(poducto.clave);
        this.prodSer.add(poducto);

      
    });
  }*/
  
 /*cargarProd(): void {
  console.log(PAGARE);
  const lstCliente = PAGARE['Hoja1'];
  lstCliente.forEach(val => {
    const fecha = new Date(val['FECHA DE VENCIMIENTO']);
    const venta: Venta = {
      fecha: fecha,
      productos: [],
      total: Number(val.MONTO),
      nombre_cliente: val.NOMBRE,
      id_cliente: '0',
      pagoInicial: 0,
    };
    console.log(venta);
    EMPRESA.id = 'wHVk9389dFgkcE2wCGpc';
    this.clienteService.addVentaPagos(venta, 0);
  });
 }*/

}
