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
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  SOLO_NUMERO_DECIMALES,
  SOLO_NUMERO_ENTERO,
  USER_ACTIVE,
} from 'src/app/core/Constantes';
import { ProductService } from 'src/app/core/services/product.service';
import { UsersService } from 'src/app/core/services/users.service';
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
export class AgregarProductoComponent implements OnInit {
  form: FormGroup;
  hideMayoreoControl = new FormControl(false);

  constructor(
    fb: FormBuilder,
    private productoService: ProductService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AgregarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Producto>
  ) {
    console.log(data);
    this.hideMayoreoControl.setValue(
      data.cantidad_mayoreo || data.precio_mayoreo || data.precio_especial
        ? true
        : false
    );
    this.form = fb.group({
      hideRequired: this.hideMayoreoControl,
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
        data.cantidad ? Math.round(data.cantidad) : '',
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
        data.cantidad_mayoreo ? data.cantidad_mayoreo : '',
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

  ngOnInit(): any {}

  add(e: Event): void {
    e.preventDefault();
    if (this.form.valid) {
      this.form.value.nombre = this.form.value.nombre.toLowerCase();
      this.formToUser();
    }
  }

  formToUser(): void {
    const prod: Partial<Producto> = { ...this.form.value };
    if (this.data.operacion === 'update') {
      prod.fecha_actualizacion = new Date();
    } else {
      prod.fecha_creacion = new Date();
    }
    if (!this.hideMayoreoControl.value) {
      prod.precio_especial = 0;
      prod.precio_mayoreo = 0;
      prod.cantidad_mayoreo = 0;
    }
    console.log(prod);
    ACTIVE_BLOCK.value = true;
    this.productoService
      .add(prod)
      .then((result) => {
        console.log(result);
        if (prod.operacion === 'update') {
          this.cargarPantallaLista(prod);
          this.snackBar.open(
            `Producto ${prod.clave} actualizado.`,
            '',
            DEFAULT_DURATION
          );
        } else {
          this.snackBar.open(
            `Producto ${prod.clave} agregado al inventario.`,
            '',
            DEFAULT_DURATION
          );
        }
        ACTIVE_BLOCK.value = false;
        this.dialogRef.close();
      })
      .catch((error) => {
        console.log(error);
        this.snackBar.open(error.message, 'Aceptar', DEFAULT_DURATION);
        ACTIVE_BLOCK.value = false;
      });
  }

  isFavo(): void {
    this.form.value.favorito = !this.form.value.favorito;
  }

  generateClave(): void {
    this.form.controls['clave'].setValue('DDR' + new Date().getTime());
  }

  cargarPantallaLista(prod: Partial<Producto>){
    this.data.cantidad = prod.cantidad;
    this.data.cantidad_mayoreo = prod.cantidad_mayoreo;
    this.data.descripcion = prod.descripcion;
    this.data.favorito = prod.favorito;
    this.data.nombre = prod.nombre;
    this.data.precio_compra = prod.precio_compra;
    this.data.precio_especial = prod.precio_especial;
    this.data.precio_mayoreo = prod.precio_mayoreo;
    this.data.precio_unitario = prod.precio_unitario;
  }
}
