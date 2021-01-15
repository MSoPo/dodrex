import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ACTIVE_BLOCK, DEFAULT_DURATION } from 'src/app/core/Constantes';
import { ProductService } from 'src/app/core/services/product.service';
import { Producto } from 'src/app/models/Producto';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';
import { DatosProductoComponent } from '../datos-producto/datos-producto.component';
import { EliminarProductoComponent } from '../eliminar-producto/eliminar-producto.component';

@Component({
  selector: 'app-lista-inventario',
  templateUrl: './lista-inventario.component.html',
  styleUrls: ['./lista-inventario.component.scss'],
})
export class ListaInventarioComponent implements OnInit, AfterViewInit {
  
  sortData!: Producto[];

  ngAfterViewInit() {
    console.log(this.sortData);
    this.sortData = this.dataSource.data.slice();
  }

  displayedColumns: string[] = [
    'editar',
    'clave',
    'nombre',
    'existencia',
    'precio_unitario',
    'precio_compra',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Producto>([]);

  constructor(
    public dialog: MatDialog,
    private productoService: ProductService,
    public snackBar: MatSnackBar,
    public translate: TranslateService
    ) {
      translate.setDefaultLang('es');}

  ngOnInit(): void {
    this.getFavs();
  }

  delete(element: Producto): void {
    this.dialog.open(EliminarProductoComponent, {
      data: element,
    });
  }

  edit(element: Producto): void {
    element.operacion = 'update';
    this.dialog.open(AgregarProductoComponent, {
      data: element,
    });
  }

  openDialog(elemnt: Producto): void {
    this.dialog.open(DatosProductoComponent, {
      data: elemnt,
    });
  }

  handleProductAddToVenta(product: Producto[]): void {
    this.dataSource.data = product;
  }

  fav(el: Producto): void {
    el.favorito = !el.favorito;
    ACTIVE_BLOCK.value = true;
    this.productoService.fav(el).then(result => ACTIVE_BLOCK.value = false)
    .catch((err) => {
      console.log(err);
      ACTIVE_BLOCK.value = false;
    });
  }

  getFavs(): void {
    this.productoService
      .getFavorite()
      .then((querySnapshot) => {
        this.dataSource.data;
        querySnapshot.forEach((doc: any) => {
          console.log(doc.id, ' => ', doc.data());
          this.dataSource.data.push(doc.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortDataMetod(sort: Sort){
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction == '') {
      this.sortData = data;
      return;
    }

    this.sortData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'existencia': return compare(+a.cantidad, +b.cantidad, isAsc);
        case 'precio_compra': return compare(+a.precio_compra, +b.precio_compra, isAsc);
        case 'precio_unitario': return compare(+a.precio_unitario, +b.precio_unitario, isAsc);
        case 'clave': return compare(a.clave, b.clave, isAsc);
        default: return 0;
      }
    });
    this.dataSource.data = this.sortData;
  }
  
}

function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
