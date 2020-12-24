import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './commons/nav/nav.component';
import { NotfoundComponent } from './commons/notfound/notfound.component';
import { InventarioComponent } from './components/inventario/inventario/inventario.component';
import { LayoutGuessComponent } from './components/layout/layout-guess/layout-guess.component';
import { LayoutComponent } from './components/cliente/layout/layout.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { NuevoUsuarioComponent } from './components/usuario/nuevo-usuario/nuevo-usuario.component';
import { VentaComponent } from './components/venta/venta/venta.component';
import { UserGuard } from './guard/user.guard';
import { LayoutVentaComponent } from './components/venta/layout-venta/layout-venta.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion/configuracion.component';
import { AdminGuard } from './guard/admin.guard';
import { VentaGuard } from './guard/venta.guard';
import { ReporteComponent } from './components/reporte/reporte/reporte.component';
import { ImpresionComponent } from './components/impresion/impresion.component';

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
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'user',
        component: NuevoUsuarioComponent
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
        path: 'configuracion',
        component: ConfiguracionComponent,
        canActivate: [ VentaGuard ]
      },
      {
        path: 'reporte',
        component: ReporteComponent,
        canActivate: [ AdminGuard ]
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
