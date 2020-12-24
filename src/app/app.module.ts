import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { TableVentasComponent } from './components/venta/table-ventas/table-ventas.component';
import { AutocompleteClienteComponent } from './components/inventario/autocomplete-cliente/autocomplete-cliente.component';
import { ProductoVentaComponent } from './components/venta/producto-venta/producto-venta.component';
import { AgregarProductoComponent } from './components/inventario/agregar-producto/agregar-producto.component';
import { ListaInventarioComponent } from './components/inventario/lista-inventario/lista-inventario.component';
import { AgregarClienteComponent } from './components/cliente/agregar-cliente/agregar-cliente.component';
import { ListaClienteComponent } from './components/cliente/lista-cliente/lista-cliente.component';
import { FiltrosClienteComponent } from './components/cliente/filtros-cliente/filtros-cliente.component';
import { FiltrosInventarioComponent } from './components/inventario/filtros-inventario/filtros-inventario.component';
import { AgrgarProductoCardComponent } from './components/inventario/agrgar-producto-card/agrgar-producto-card.component';
import { DatosProductoComponent } from './components/inventario/datos-producto/datos-producto.component';
import { LoginComponent, DialogOverviewExampleDialogComponent } from './components/usuario/login/login.component';
import { EliminarProductoComponent } from './components/inventario/eliminar-producto/eliminar-producto.component';
import { EliminarClienteComponent } from './components/cliente/eliminar-cliente/eliminar-cliente.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion/configuracion.component';
import { CambiarPasswordComponent } from './components/configuracion/cambiar-password/cambiar-password.component';
import { CambiarUsuarioComponent } from './components/configuracion/cambiar-usuario/cambiar-usuario.component';
import { CambiarEmpresaComponent } from './components/configuracion/cambiar-empresa/cambiar-empresa.component';
import { UsuarioEmpresaComponent } from './components/configuracion/usuario-empresa/usuario-empresa.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { NuevoUsuarioComponent } from './components/usuario/nuevo-usuario/nuevo-usuario.component';
import { HeaderComponent } from './commons/header/header.component';
import { NotfoundComponent } from './commons/notfound/notfound.component';
import { MenuComponent } from './commons/menu/menu.component';
import { LayoutComponent } from './components/cliente/layout/layout.component';
import { LayoutGuessComponent } from './components/layout/layout-guess/layout-guess.component';
import { VentaComponent } from './components/venta/venta/venta.component';
import { InventarioComponent } from './components/inventario/inventario/inventario.component';
import { NavComponent } from './commons/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { TipoNominaPipe } from './core/pipe/tipo-nomina.pipe';
import { LayoutVentaComponent } from './components/venta/layout-venta/layout-venta.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ResumenVentaComponent } from './components/venta/resumen-venta/resumen-venta.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DatosEmpresaConfigComponent } from './components/configuracion/datos-empresa-config/datos-empresa-config.component';
import { ReporteComponent } from './components/reporte/reporte/reporte.component';
import { FiltrosComponent } from './components/reporte/filtros/filtros.component';
import { TablaComponent } from './components/reporte/tabla/tabla.component';
import { DetallesComponent } from './components/reporte/detalles/detalles.component';
import { ImpresionComponent } from './components/impresion/impresion.component';
import { NuevaEmpresaComponent } from './components/configuracion/nueva-empresa/nueva-empresa.component';

export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TableVentasComponent,
    AutocompleteClienteComponent,
    ProductoVentaComponent,
    AgregarProductoComponent,
    ListaInventarioComponent,
    AgregarClienteComponent,
    ListaClienteComponent,
    FiltrosClienteComponent,
    FiltrosInventarioComponent,
    AgrgarProductoCardComponent,
    DatosProductoComponent,
    LoginComponent,
    NuevoUsuarioComponent,
    HeaderComponent,
    NotfoundComponent,
    MenuComponent,
    LayoutComponent,
    LayoutGuessComponent,
    DialogOverviewExampleDialogComponent,
    VentaComponent,
    InventarioComponent,
    NavComponent,
    TipoNominaPipe,
    LayoutVentaComponent,
    ResumenVentaComponent,
    EliminarProductoComponent,
    EliminarClienteComponent,
    ConfiguracionComponent,
    CambiarPasswordComponent,
    CambiarUsuarioComponent,
    CambiarEmpresaComponent,
    UsuarioEmpresaComponent,
    DatosEmpresaConfigComponent,
    ReporteComponent,
    FiltrosComponent,
    TablaComponent,
    DetallesComponent,
    ImpresionComponent,
    NuevaEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient]}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
