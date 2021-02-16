import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  EMPRESA,
  PRODUCTOS,
  PRODUCTOS_PENDIENTES,
  SOLO_NUMERO_DECIMALES,
  SOLO_NUMERO_ENTERO,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { ProductService } from 'src/app/core/services/product.service';
import { UsersService } from 'src/app/core/services/users.service';
import { round10 } from 'src/app/core/Util';
import { Producto } from 'src/app/models/Producto';

@Component({
  selector: 'app-agregar-producto',
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss'],
})
export class AgregarProductoComponent {
  form: FormGroup;
  hideMayoreoControl = new FormControl(false);

  constructor(
    fb: FormBuilder,
    private productoService: ProductService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AgregarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Producto>,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('es');
    console.log(data);
    EMPRESA.cant_mayoreo = EMPRESA.cant_mayoreo ? EMPRESA.cant_mayoreo : 0;
    this.hideMayoreoControl.setValue(
      data.cantidad_mayoreo || data.precio_mayoreo || data.precio_especial
        ? true
        : false
    );
    this.form = fb.group({
      hideRequired: this.hideMayoreoControl,
      fraccion: data.fraccion ? data.fraccion : 0,
      clave: [
        data.clave ? data.clave : '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(1),
        ],
      ],
      nombre: [
        data.nombre ? data.nombre : '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3),
        ],
      ],
      cantidad: [
        data.cantidad ? Math.round(data.cantidad) : 0,
        [
          Validators.required,
          Validators.max(99999),
          Validators.min(0),
          Validators.pattern(SOLO_NUMERO_ENTERO),
        ],
      ],
      precio_unitario: [
        data.precio_unitario ? data.precio_unitario : '',
        [
          Validators.required,
          Validators.max(99999),
          Validators.min(0),
          Validators.pattern(SOLO_NUMERO_DECIMALES),
        ],
      ],
      precio_compra: [
        data.precio_compra ? data.precio_compra : '',
        [
          Validators.required,
          Validators.max(99999),
          Validators.min(0),
          Validators.pattern(SOLO_NUMERO_DECIMALES),
        ],
      ],
      descripcion: [
        data.descripcion ? data.descripcion : '',
        [Validators.minLength(3), Validators.maxLength(250)],
      ],
      cantidad_mayoreo: [
        data.cantidad_mayoreo ? data.cantidad_mayoreo : EMPRESA.cant_mayoreo,
        [
          Validators.max(99999),
          Validators.min(0),
          Validators.pattern(SOLO_NUMERO_ENTERO),
        ],
      ],
      precio_mayoreo: [
        data.precio_mayoreo ? data.precio_mayoreo : '',
        [
          Validators.max(99999),
          Validators.min(0),
          Validators.pattern(SOLO_NUMERO_DECIMALES),
        ],
      ],
      precio_especial: [
        data.precio_especial ? data.precio_especial : '',
        [
          Validators.max(99999),
          Validators.min(0),
          Validators.pattern(SOLO_NUMERO_DECIMALES),
        ],
      ],
      favorito: [data.favorito],
      operacion: [data.operacion ? data.operacion : 'creacion'],
      usuario: USER_ACTIVE.id,
      activo: data.activo ? data.activo : true,
    });
  }

  add(e: Event): void {
    e.preventDefault();
    if (this.form.valid) {
      this.form.value.nombre = this.form.value.nombre.toLowerCase();
      this.formToUser();
    }
  }

  formToUser(): void {
    const prod: Partial<Producto> = { ...this.form.value };
    const existe = PRODUCTOS.find(p => p.clave === prod.clave);
    if (this.data.operacion === 'update') {
      prod.fecha_actualizacion = new Date();
    } else {
      if(existe){
        this.SNACK('CLAVE_REPETIDA', 'Aceptar');
        return;
      }
      prod.fecha_creacion = new Date();
    }
    if (!this.hideMayoreoControl.value) {
      prod.precio_especial = 0;
      prod.precio_mayoreo = 0;
      prod.cantidad_mayoreo = 0;
    }
    
    if (prod.operacion === 'update') {
      this.cargarPantallaLista(prod);
      this.SNACK('ACTUALIZACION_OK', '');
    } else {
      this.SNACK('REGISTRO_OK','');
    }
    this.data = prod;
    this.dialogRef.close(prod);
    this.guardarProducto(prod);
  }

  segurirPrecion(): void {
    const precio = this.form.value.precio_compra;
    if(EMPRESA.porc_unitario && EMPRESA.porc_unitario > 0){
      const porc = round10(precio * ((EMPRESA.porc_unitario / 100) + 1), -2);
      this.form.value.precio_unitario = porc;
    }
    if(EMPRESA.porc_mayoreo && EMPRESA.porc_mayoreo > 0){
      const porc = round10(precio * ((EMPRESA.porc_mayoreo / 100) + 1), -2);
      this.form.value.precio_mayoreo = porc;
    }
    if(EMPRESA.porc_especial && EMPRESA.porc_especial > 0){
      const porc = round10(precio * ((EMPRESA.porc_especial / 100) + 1), -2);
      this.form.value.precio_especial = porc;
    }
    this.form.setValue({...this.form.value}); 
  }

  isFavo(): void {
    this.form.value.favorito = !this.form.value.favorito;
  }

  generateClave(): void {
    this.form.controls['clave'].setValue('DDR' + new Date().getTime());
  }

  cargarPantallaLista(prod: Partial<Producto>) {
    this.data.cantidad = prod.cantidad;
    this.data.cantidad_mayoreo = prod.cantidad_mayoreo;
    this.data.descripcion = prod.descripcion;
    this.data.favorito = prod.favorito;
    this.data.nombre = prod.nombre;
    this.data.precio_compra = prod.precio_compra;
    this.data.precio_especial = prod.precio_especial;
    this.data.precio_mayoreo = prod.precio_mayoreo;
    this.data.precio_unitario = prod.precio_unitario;
    this.data.fraccion = prod.fraccion;
  }

  guardarProducto(prod: Partial<Producto>){
    this.productoService
      .add(prod)
      .catch((error) => {
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
        prod.error = error;
        prod.error.mensaje = error.message;
        PRODUCTOS_PENDIENTES.push(prod);
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
