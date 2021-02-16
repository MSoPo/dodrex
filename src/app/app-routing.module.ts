import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './commons/nav/nav.component';
import { NotfoundComponent } from './commons/notfound/notfound.component';
import { InventarioComponent } from './components/inventario/inventario/inventario.component';
import { LayoutGuessComponent } from './components/layout/layout-guess/layout-guess.component';
import { LayoutComponent } from './components/cliente/layout/layout.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { NuevoUsuarioComponent } from './components/usuario/nuevo-usuario/nuevo-usuario.component';
import { UserGuard } from './guard/user.guard';
import { LayoutVentaComponent } from './components/venta/layout-venta/layout-venta.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion/configuracion.component';
import { AdminGuard } from './guard/admin.guard';
import { VentaGuard } from './guard/venta.guard';
import { ReporteComponent } from './components/reporte/reporte/reporte.component';
import { ImpresionComponent } from './components/impresion/impresion.component';
import { LayoutCargaComponent } from './components/carga/layout-carga/layout-carga.component';
import { ReporteCargaComponent } from './components/reporte-carga/reporte-carga/reporte-carga.component';
import { LayoutCotizacionComponent } from './components/cotuzacion/layout-cotizacion/layout-cotizacion.component';
import { UseractiveGuard } from './guard/useractive.guard';
import { UserEmpresaActiveGuard } from './guard/user-empresa-active.guard';
import { PedidoComponent } from './components/pedido/pedido.component';
import { UserActiveGuard } from './guard/user-active.guard';
import { ReportePagosComponent } from './components/pagos/reporte-pagos/reporte-pagos.component';
import { CargamasivaComponent } from './components/masivo/cargamasiva/cargamasiva.component';
import { LayoutLoginComponent } from './components/layout/layout-login/layout-login.component';

const routes: Routes = [
  {
    path: 'nota',
    component: ImpresionComponent,
    children: [
      {
        path: '',
        redirectTo: '/nota',
        pathMatch: 'full',
      },
    ]
  },
  
  {
    path: 'cargaMasiva',
    component: CargamasivaComponent
  },
  {
    path: 'user',
    component: LayoutLoginComponent,
    children: [
      {
        path: '',
        redirectTo: '/user/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [ UseractiveGuard ]
      },
      {
        path: 'user',
        component: NuevoUsuarioComponent,
        canActivate: [ UserEmpresaActiveGuard ]
      },
    ]
  },
  {
    path: '',
    component: NavComponent,
    canActivate: [ UserGuard ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/inicio',
      },
      {
        path: 'inicio',
        component: LayoutGuessComponent,
        canActivate: [ UserActiveGuard ]
      },
      {
        path: 'inventario',
        component: InventarioComponent,
        canActivate: [ AdminGuard ]
      },
      {
        path: 'clientes',
        component: LayoutComponent,
        canActivate: [ AdminGuard ]
      },
      {
        path: 'ventas',
        component: LayoutVentaComponent,
        canActivate: [ VentaGuard ]
      },
      {
        path: 'carga',
        component: LayoutCargaComponent,
        canActivate: [ AdminGuard ]
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
        canActivate: [ VentaGuard ]
      },
      {
        path: 'reporte',
        component: ReporteComponent,
        canActivate: [ AdminGuard ]
      },
      {
        path: 'reporteCarga',
        component: ReporteCargaComponent,
        canActivate: [ AdminGuard ]
      },
      {
        path: 'cotizacion',
        component: LayoutCotizacionComponent,
        canActivate: [ VentaGuard ]
      },
      {
        path: 'pedidos',
        component: PedidoComponent,
        canActivate: [ AdminGuard ]
      },
      {
        path: 'pagos',
        component: ReportePagosComponent,
        canActivate: [ AdminGuard ]
      },
      {
        path: 'impresion',
        component: ImpresionComponent
      }
    ]
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
