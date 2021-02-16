import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CLIENTEACTUAL,
  CLIENTES,
  DEFAULT_DURATION,
  TIPO_DESCUENTO,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { VentaElement } from 'src/app/models/ElementoVenta';
import { FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';
import { Venta } from 'src/app/models/Venta';
import { DetalleVenta } from 'src/app/models/DetalleVenta';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ResumenCotizacionComponent } from '../resumen-cotizacion/resumen-cotizacion.component';


@Component({
  selector: 'app-table-cotizacion',
  templateUrl: './table-cotizacion.component.html',
  styleUrls: ['./table-cotizacion.component.scss'],
})
export class TableCotizacionComponent implements OnInit {
  displayedColumns: string[] = [
    'nombre',
    'cantidad',
    'precio',
    'subtotal',
    'quitar',
  ];
  ELEMENT_DATA: VentaElement[] = [];
  dataSource = new MatTableDataSource<VentaElement>(this.ELEMENT_DATA);
  nombreCliente = new FormControl('');
  options: string[] = [];
  filteredOptions!: string[];
  lastSearch = '';
  lstClientes: Cliente[] = [];
  cliente: Partial<Cliente> = {};

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private clienteService: ClienteService,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.lstClientes = CLIENTES;
    this.options = CLIENTES.map((m) => {
      return `${m.nombre}(${m.clave})`;
    });
    this.nombreCliente.valueChanges.subscribe((value) => {
      if(!this.options.length){
        this.lstClientes = CLIENTES;
        this.options = CLIENTES.map((m) => {
          return `${m.nombre}(${m.clave})`;
        });
      }
      this.filter(value.toUpperCase());
    });
  }

  /** Gets the total cost of all transactions. */
  getTotalCost(): number {
    return this.ELEMENT_DATA.map((t) => t.subtotal).reduce(
      (acc, value) => acc + value,
      0
    );
  }

  addCantidad(event: any, element: VentaElement): void {
    let valor = event.target.value;
    if (isNaN(valor)) {
      this.SNACK('ERROR_CANTIDAD', 'ACEPTAR');
      element.cantidad = 1;
    } else {
      valor = Number(valor);
      if ((element.fraccion && valor > 0) || Number.isInteger(valor) && valor > 0) {
        element.cantidad = valor;
      } else {
        this.SNACK('ERROR_VAL_CANT', 'ACEPTAR');
        element.cantidad = valor >= 1 ? Math.trunc(valor) : 1;
      }
      element.subtotal = element.precio * element.cantidad;
      this.dataSource.data = this.ELEMENT_DATA;
    }
  }

  handleProductAddToVenta(product: Producto): void {
    console.log('product -> ', product);
    const valEx = this.ELEMENT_DATA.find((val) => val.clave === product.clave);
    if (valEx) {
      valEx.cantidad++;
      valEx.subtotal = valEx.cantidad * valEx.precio;
      this.dataSource.data = this.ELEMENT_DATA;
      return;
    }

    const elemet: VentaElement = {
      cantidad: 1,
      nombre: product.nombre,
      precio: product.precio_unitario,
      subtotal: product.precio_unitario,
      clave: product.clave,
      stock: product.cantidad,
      precio_especial: product.precio_especial,
      precio_mayoreo: product.precio_mayoreo,
      cantidad_mayoreo: product.cantidad_mayoreo,
      precio_unitario: product.precio_unitario,
      fraccion: product.fraccion
    };
    this.ELEMENT_DATA.push(elemet);
    this.dataSource.data = this.ELEMENT_DATA;
  }

  private filter(value: string): void {
    this.filteredOptions = this.options.filter((option) =>
      option.toUpperCase().includes(value)
    );
  }

  chanceCliente(e: number): void {
    if (e === 13) {
      this.cambiarCliente();
    }
  }

  cambiarCliente():void{
    let val = this.nombreCliente.value.split('(');
      val = val[val.length - 1].split(')')[0];
      if (val) {
        this.lstClientes.forEach((el: any) => {
          if (el && el.clave === val) {
            console.log(el.clave + '...' + val);
            this.cliente = el;
            this.actualizarValores(el);
          }
        });
        if (this.cliente) { return; }
      }
      const sinCliente: Partial<Cliente> = {
        tipo_descuento: 0,
        clave: '',
        nombre: '',
        descuento: 0,
        telefono: ''
      };
      this.cliente = sinCliente;
      this.actualizarValores(sinCliente);
  }

  actualizarValores(cliente: Partial<Cliente>): void {
    if (Number(cliente.tipo_descuento) === TIPO_DESCUENTO.PRECIO_ESPECIAL) {
      this.ELEMENT_DATA.forEach((val) => {
        val.precio =
          val.precio_especial > 0
            ? val.precio_especial
            : val.precio_unitario;
        val.subtotal = val.precio * val.cantidad;
      });
    } else if (Number(cliente.tipo_descuento) === TIPO_DESCUENTO.DESCUENTO) {
      this.ELEMENT_DATA.forEach((val) => {
        if (cliente.descuento && cliente.descuento > 0) {
          val.precio = val.precio_unitario * (1 - cliente.descuento / 100);
          val.subtotal = val.precio * val.cantidad;
        } else {
          val.precio = val.precio_unitario;
          val.subtotal = val.precio * val.cantidad;
        }
      });
    } else {
      this.ELEMENT_DATA.forEach((val) => {
        val.precio = val.precio_unitario;
        val.subtotal = val.precio * val.cantidad;
      });
    }
  }

  pagar(cot: boolean): void {
    const detallesVenta: DetalleVenta[] = [];
    console.log(this.ELEMENT_DATA);
    this.ELEMENT_DATA.forEach((el) => {
      const det: DetalleVenta = {
        id: el.clave,
        subtotal: el.subtotal,
        cantidad: el.cantidad,
        nombre: el.nombre,
      };

      detallesVenta.push(det);
    });

    const venta: Venta = {
      fecha: new Date(),
      id_usuario: USER_ACTIVE.id,
      nombre_usuario: USER_ACTIVE.nombre,
      productos: detallesVenta,
      total: this.getTotalCost(),
    };

    if (this.cliente.clave) {
      venta.id_cliente = this.cliente.clave;
      venta.nombre_cliente = this.cliente.nombre;
      venta.tipo_descuento = this.cliente.tipo_descuento;
      venta.descuento = this.cliente.descuento;
    } else {
      venta.id_cliente = '';
      venta.nombre_cliente = '';
      venta.tipo_descuento = 0;
      venta.descuento = 0;
    }
    //Limpiamos esos valores que son los que se muestran por si venian cargados de otra venta
    CLIENTEACTUAL.correo = '';
    CLIENTEACTUAL.nombre = '';
    CLIENTEACTUAL.direccion = '';
    CLIENTEACTUAL.telefono = '';
    Object.assign(CLIENTEACTUAL, this.cliente);
    this.openDialog(venta, cot);

  }

  quitar(element: VentaElement): void{
    console.log(element.clave);
    const idx = this.ELEMENT_DATA.findIndex((el) => el.clave===element.clave);
    this.ELEMENT_DATA.splice(idx, 1);
    this.dataSource.data = this.ELEMENT_DATA;
  }

  openDialog(venta: Venta, cot : boolean): void {
    const dialogRef = this.dialog.open(ResumenCotizacionComponent, {
      width: '250px',
      data: { venta: {...venta}, cotizacion: cot },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  TRANSLATE(str: string) {
    return str ? this.translate.instant(str) : '';
  }

  SNACK(msj: string, btm: string) {
    this.snackBar.open(
      this.TRANSLATE(msj),
      this.TRANSLATE(btm),
      DEFAULT_DURATION
    );
  }
}
