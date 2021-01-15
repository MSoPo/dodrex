import { Component, OnInit } from '@angular/core';
import { EMPRESA } from 'src/app/core/Constantes';
import { ProductService } from 'src/app/core/services/product.service';
import { TereInventario } from '../../../cargaMasiva/tere';
import { Producto } from '../../../models/Producto'

@Component({
  selector: 'app-cargamasiva',
  templateUrl: './cargamasiva.component.html',
  styleUrls: ['./cargamasiva.component.scss']
})
export class CargamasivaComponent implements OnInit {

  constructor(private prodSer: ProductService) { }

  ngOnInit(): void {
  }

  cargarProd(): void{
    console.log(TereInventario);
    let carga = 0;
    TereInventario.forEach(pro => {
      if(carga > 20){
        return;
      }
      const cantidad = pro['Cantidad'];
      let cant = Math.round(Number(cantidad));

      const clave:string = pro['Codigo'] + '';
      const nombre:string = pro['Nombre'] + '';
      const precioUnitario:number = Number(pro['Precio Unitario']);
      const precioCompra:number = Number(pro['Precio Compra']);
      const precioMayoreo:number = Number(pro['Precio Mayoreo']);
      if(cant > 0) {

        const poducto: Producto  = {
          activo: true,
          cantidad: cant,
          cantidad_mayoreo: 0,
          clave: clave,
          descripcion: '',
          favorito: false,
          fecha_creacion: new Date(),
          nombre: nombre.toLowerCase(),
          precio_compra: precioCompra,
          precio_unitario: precioUnitario,
          precio_especial: precioMayoreo,
          precio_mayoreo: 0,
          usuario: 'CARGAMASIVA',
          operacion: 'update',
          fecha_actualizacion: new Date()
        }
        EMPRESA.id = 'zatdmb2pP44qk8P0G7HR';
        this.prodSer.add(poducto);

      }
    });
  }

}
