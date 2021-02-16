import { ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  ACTIVE_BLOCK,
  DEFAULT_DURATION,
  EMPRESA,
  MENU,
  PRODUCTOS,
  CLIENTES,
  ROL_ADMINISTRADO,
  USER_ACTIVE,
  CONFIG,
  FOLIO_VENTA,
  FOLIO_ANTETRIO,
  PRODUCTOS_PENDIENTES,
  CLIENTE_PENDIENTE,
  VENTA_PENDIENTE,
} from 'src/app/core/Constantes';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/services/users.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TranslateService } from '@ngx-translate/core';
import { Producto } from 'src/app/models/Producto';
import { Usuario } from 'src/app/models/Usuario';
import { clearLogout } from 'src/app/core/Util';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Cliente } from 'src/app/models/Cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  username = USER_ACTIVE.nombre;
  rol;
  rolAdmin = ROL_ADMINISTRADO.valor;
  id_empresa = USER_ACTIVE.id_empresa;
  urlFile = EMPRESA.urlImage;
  rutaActual = '';
  errorProducto = PRODUCTOS_PENDIENTES;
  errorCliente = CLIENTE_PENDIENTE;
  errorVenta = VENTA_PENDIENTE;
  menu;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UsersService,
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService,
    private productService: ProductService,
  ) {
    console.log(this.id_empresa);
    this.rutaActual = this.router.url;
    this.menu = MENU;
    this.rol = USER_ACTIVE;
    if(CONFIG.reload){
      CONFIG.reload = false;
    }else {
      this.cargarFavs();
    }
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  logout(): void {
    clearLogout();
    this.auth
      .logout()
      .then(() => {
        this.snackBar.open('Vuelve pronto.', undefined, DEFAULT_DURATION);
        this.router.navigate(['/user']);
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'Aceptar', DEFAULT_DURATION);
      });
  }

  cargarFavs(): void {
    console.log("Cargar Nav =>",EMPRESA.id);
    if (EMPRESA.id) {
      this.productService.getAll();
    }
    if (!EMPRESA.id) {
      ACTIVE_BLOCK.value = true;
      this.userService.getCargaInicial().subscribe(respuesta => {
        Object.assign(USER_ACTIVE, respuesta.usuario);
        Object.assign(EMPRESA, respuesta.empresa);
        FOLIO_VENTA.value = respuesta.folio;
        FOLIO_ANTETRIO.value = respuesta.folio-1;
        if(respuesta.productos && respuesta.productos.length > 0){
          respuesta.productos.forEach((element: Producto) => {
            PRODUCTOS.push(element);
          });
        }
        if(respuesta.clientes && respuesta.clientes.length > 0){
          respuesta.clientes.forEach((element: Cliente) => {
            CLIENTES.push(element);
          });
        }
        EMPRESA.id = USER_ACTIVE.id_empresa;
        this.id_empresa = USER_ACTIVE.id_empresa;
        this.urlFile = EMPRESA.urlImage;
        ACTIVE_BLOCK.value = false;
        CONFIG.primeraCarga = false;
      }, err => {
        ACTIVE_BLOCK.value = false;
        this.SNACK('ERROR_SESION', 'ACEPTAR');
      });
      //this.loadUsuario();
    }
  }

  reportarError(): void{
    ACTIVE_BLOCK.value = true;
    this.productService.errorService()
    .then(ero => {
      ACTIVE_BLOCK.value = false;
      location.reload()
    })
    .catch(er => {
      console.log(er);
      ACTIVE_BLOCK.value = false;
      this.SNACK('ERROR_REINT','ACEPTAR')
    });
  }
/*
  loadUsuario(){
    this.userService.getUser(USER_ACTIVE.id).subscribe((respuesta) => {
      const usuario = respuesta.data();
      console.log("Cargar usuario => ", usuario);
      Object.assign(USER_ACTIVE, usuario);
      this.loadEmpresa(usuario);
    });
  }

  loadEmpresa(usuario: Usuario) {
    this.userService.getEmpresa(usuario.id_empresa).subscribe((resp) => {
      const dataEmpresa: any = resp.data();
      console.log("Cargar empresa => ", dataEmpresa);
      if (!dataEmpresa) {
        ACTIVE_BLOCK.value = false;
        this.SNACK('ERROR_SESION', 'ACEPTAR');
        return;
      }
      Object.assign(EMPRESA, dataEmpresa);
      this.id_empresa = resp.id;
      EMPRESA.id = resp.id;
      this.urlFile = EMPRESA.urlImage;
      this.loadProductos();
      ACTIVE_BLOCK.value = false;
    });
  }

  loadProductos() {
    console.log("Cargar Inicio");
    this.productService
      .getAll()
      .then((r) => {
        console.log("Cargar Productos");
        r.forEach((e: any) => {
          const pro: Producto = e.data();
          PRODUCTOS.push(pro);
          return;
        });
        this.loadCliente();
      })
      .catch((er) => {
        ACTIVE_BLOCK.value = false;
        this.SNACK('ERROR_GRAL', 'ACEPTAR');
      });
  }

  loadCliente() {
    console.log("Cargar Clientes");
    this.clienteService.getAll().then(c => {
      console.log("Cargado Clientes");
      c.forEach((e: any) => {
        const cliente: Cliente = e.data();
        CLIENTES.push(cliente);
        return;
      });
      ACTIVE_BLOCK.value = false;
      CONFIG.primeraCarga = false;
    }).catch(er => {
      ACTIVE_BLOCK.value = false;
      this.SNACK('ERROR_GRAL', 'ACEPTAR');
    });
  }*/

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
