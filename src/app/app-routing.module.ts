import { Component, NgModule } from '@angular/core';
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
    path: 'user',
    component: LayoutGuessComponent,
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
        redirectTo: '/inventario',
      },
      {
        path: 'inventario',
        component: InventarioComponent,
        canActivate: [ AdminGuard, UserActiveGuard ]
      },
      {
        path: 'clientes',
        component: LayoutComponent,
        canActivate: [ AdminGuard, UserActiveGuard ]
      },
      {
        path: 'ventas',
        component: LayoutVentaComponent,
        canActivate: [ VentaGuard, UserActiveGuard ]
      },
      {
        path: 'carga',
        component: LayoutCargaComponent,
        canActivate: [ AdminGuard, UserActiveGuard ]
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
        canActivate: [ VentaGuard, UserActiveGuard ]
      },
      {
        path: 'reporte',
        component: ReporteComponent,
        canActivate: [ AdminGuard, UserActiveGuard ]
      },
      {
        path: 'reporteCarga',
        component: ReporteCargaComponent,
        canActivate: [ AdminGuard, UserActiveGuard ]
      },
      {
        path: 'cotizacion',
        component: LayoutCotizacionComponent,
        canActivate: [ VentaGuard, UserActiveGuard ]
      },
      {
        path: 'pedidos',
        component: PedidoComponent,
        canActivate: [ AdminGuard, UserActiveGuard ]
      },
      {
        path: 'pagos',
        component: ReportePagosComponent,
        canActivate: [ AdminGuard, UserActiveGuard ]
      },
      {
        path: 'cargaMasiva',
        component: CargamasivaComponent,
        canActivate: [ AdminGuard, UserActiveGuard ]
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
