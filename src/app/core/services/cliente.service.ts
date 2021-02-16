import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, QueryGroupFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/Cliente';
import { Venta } from 'src/app/models/Venta';
import { CLIENTES, EMPRESA } from '../Constantes';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private afs: AngularFirestore) {}

  add(cliente: Partial<Cliente>): Promise<void> {
    cliente.clave = cliente.clave?.toString();
    return this.afs.doc('empresa/' + EMPRESA.id).collection('clientes')
      .doc(cliente.clave).set(cliente, { merge: true });
  }
  
  addVentaPagos(venta: Venta, pagoInicial: number):Promise<void>{
    return this.afs.doc('empresa/' + EMPRESA.id).collection('ventasPago')
    .doc(venta.id).set({
        'pagoInicial' : pagoInicial,
        'pagoTotal' : venta.total,
        'deuda' : venta.total,
        'fecha' : venta.fecha,
        'cliente' : venta.nombre_cliente,
        'id_cliente' : venta.id_cliente
      }, { merge: true });
  }

  addPago(idVentaPago: string, monto: number):Promise<any>{
    return this.afs.doc('empresa/' + EMPRESA.id).collection('ventasPago')
    .doc(idVentaPago).collection('pagos').add({
        'fecha' : new Date(),
        'pago' : monto
      });
  }

  getPagoDeuda(): Promise<any>{
    const vantaPagos = this.afs.doc('empresa/' + EMPRESA.id).collection('ventasPago').ref;
    return vantaPagos.where('deuda', '>', 0)
    .get();
  }
  getPagoLiquidado(): Promise<any>{
    const vantaPagos = this.afs.doc('empresa/' + EMPRESA.id).collection('ventasPago').ref;
    return vantaPagos.where('deuda', '<=', 0)
    .get();
  }

  getPagoCliente(idCliente: string): Promise<any>{
    const vantaPagos = this.afs.doc('empresa/' + EMPRESA.id).collection('ventasPago').ref;
    return vantaPagos.where('id_cliente', '==', idCliente)
    .get();
  }
  
  getLstPago(idVentaPago: string): Promise<any>{
    const vantaPagos = this.afs.doc(`empresa/${EMPRESA.id}/ventasPago/${idVentaPago}`).collection('pagos').ref;
    return vantaPagos.get();
  }

  activate(cliente: Partial<Cliente>): Promise<void> {
    return this.pathCliente()
      .doc(cliente.clave)
      .set({
        activo : cliente.activo,
        operacion : 'update'
      }, { merge: true });
  }

  fav(cliente: Partial<Cliente>): Promise<void> {
    return this.pathCliente().doc(cliente.clave)
      .set({
        favorito : cliente.favorito,
        operacion : 'update'
      }, { merge: true });
  }

  getFavorite(): Promise<any>{
    return this.pathCliente().where('favorito', '==', true).where('activo', '==', true).get();
  }

  getCancelar(): Promise<any>{
    return this.pathCliente().where('activo', '==', false).get();
  }

  getClave(clave: string): Promise<any> {
    return this.pathCliente().where('clave', '==', clave).where('activo', '==', true).get();
  }

  getClaveAll(clave: string): Promise<any> {
    return this.pathCliente().where('clave', '==', clave).get();
  }

  getNombre(nombre: string): Promise<any>{
    const name = nombre ? nombre.toUpperCase() : ''; 
    return this.pathCliente()
      .where('nombre', '>=', name)
      .where('nombre', '<', name + '\uf8ff')
      .where('activo', '==', true)
      .get();
  }
  
  getAll(): Promise<any>{
    return this.pathCliente().get();
  }

  pathCliente(): CollectionReference{
    return this.afs.doc('empresa/' + EMPRESA.id).collection('clientes').ref;
  }

}
