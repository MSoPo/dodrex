import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CLIENTEACTUAL,
  DEFAULT_DURATION,
  TIPO_DESCUENTO,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { VentaElement } from 'src/app/models/ElementoVenta';
import { FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';
import { Venta } from 'src/app/models/Venta';
import { VentaService } from 'src/app/core/services/venta.service';
import { DetalleVenta } from 'src/app/models/DetalleVenta';
import { MatDialog } from '@angular/material/dialog';
import { ResumenVentaComponent } from '../resumen-venta/resumen-venta.component';


@Component({
  selector: 'app-table-ventas',
  templateUrl: './table-ventas.component.html',
  styleUrls: ['./table-ventas.component.scss'],
})
export class TableVentasComponent implements OnInit {
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
  lstClientes = [];
  cliente: Partial<Cliente> = {};

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.nombreCliente.valueChanges.subscribe((value) => {
      const val = value.trim().toUpperCase();
      this.filter(val);
      if (val.length !== 4 || this.lastSearch === val) {
        return;
      } else {
        console.log(val);
        this.clienteService
          .getNombre(val)
          .then((res) => {
            this.lastSearch = val;
            this.lstClientes = res.docs;
            this.options = res.docs.map((m: { data: () => Producto }) => {
              return m.data().nombre + '(' + m.data().clave + ')';
            });
            console.log(value);
            console.log(this.options);
            this.filter(value);
          })
          .catch((error) => console.log(error));
      }
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
      this.snackBar.open(
        `Cantiad del producto ${element.clave} no váida`,
        'Aceptar',
        DEFAULT_DURATION
      );
      element.cantidad = 1;
    } else {
      valor = Number(valor);
      if (valor > element.stock) {
        this.snackBar.open(
          `Cantidad insuficiente en inventario.`,
          'Aceptar',
          DEFAULT_DURATION
        );
        element.cantidad = element.stock;
      } else if (Number.isInteger(valor) && valor > 0) {
        element.cantidad = valor;
      } else {
        this.snackBar.open(
          `Solo se aceptan cantidades enteras y mayores a 0`,
          'Aceptar',
          DEFAULT_DURATION
        );
        element.cantidad = valor >= 1 ? Math.trunc(valor) : 1;
      }
      element.subtotal = element.precio * element.cantidad;
      console.log(`${element.subtotal} => ${element.cantidad}`);
      this.dataSource.data = this.ELEMENT_DATA;
    }
  }

  handleProductAddToVenta(product: Producto): void {
    console.log('product -> ', product);
    if (product.cantidad < 1) {
      this.snackBar.open(
        `El producto ${product.clave} está agotado`,
        'Aceptar',
        DEFAULT_DURATION
      );
      return;
    }

    const valEx = this.ELEMENT_DATA.find((val) => val.clave === product.clave);
    if (valEx) {
      if (valEx.cantidad >= product.cantidad) {
        this.snackBar.open(
          `Cantidad insuficiente en inventario.`,
          'Aceptar',
          DEFAULT_DURATION
        );
        return;
      }
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
          if (el && el.data().clave === val) {
            console.log(el.data().clave + '...' + val);
            this.cliente = el.data();
            this.actualizarValores(el.data());
          }
        });
        if (this.cliente) { return; }
      }
      const sinCliente: Partial<Cliente> = {
        tipo_descuento: 0,
        clave: '',
        nombre: '',
        descuento: 0,
      };
      this.cliente = sinCliente;
      this.actualizarValores(sinCliente);
  }

  actualizarValores(cliente: Partial<Cliente>): void {
    if (Number(cliente.tipo_descuento) === TIPO_DESCUENTO.PRECIO_ESPECIAL) {
      this.ELEMENT_DATA.forEach((val) => {
        val.precio =
          val.precio_especial < val.precio_unitario
            ? val.precio_unitario
            : val.precio_especial;
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

  pagar(): void {
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
    Object.assign(CLIENTEACTUAL, this.cliente);
    this.openDialog(venta);

  }

  quitar(element: VentaElement): void{
    console.log(element.clave);
    const idx = this.ELEMENT_DATA.findIndex((el) => el.clave===element.clave);
    this.ELEMENT_DATA.splice(idx, 1);
    this.dataSource.data = this.ELEMENT_DATA;
  }

  openDialog(venta: Venta): void {
    const dialogRef = this.dialog.open(ResumenVentaComponent, {
      width: '250px',
      data: { ...venta },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
