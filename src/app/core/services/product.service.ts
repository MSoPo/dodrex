import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CLIENTE_PENDIENTE, EMPRESA, PRODUCTOS_PENDIENTES, SUCURSAL, VENTA_PENDIENTE } from '../Constantes';
import { Producto } from '../../models/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private afs: AngularFirestore) {}

  add(producto: Partial<Producto>): Promise<void> {
    let cantidad = producto.cantidad;
    if(SUCURSAL.clave && SUCURSAL.clave != '1'){
      if (producto.operacion === 'update'){
        switch(SUCURSAL.numero){
          case 1: producto.sucursal1 = producto.cantidad; break;
          case 2: producto.sucursal2 = producto.cantidad; break;
          case 3: producto.sucursal3 = producto.cantidad; break;
        }
      } else {
        producto.cantidad = 0;
        switch(SUCURSAL.numero){
          case 1: producto.sucursal1 = producto.cantidad; break;
          case 2: producto.sucursal2 = producto.cantidad; break;
          case 3: producto.sucursal3 = producto.cantidad; break;
        }
      }
      delete producto.cantidad;
    }
    const r = this.afs
      .doc('empresa/' + EMPRESA.id)
      .collection('productos')
      .doc(producto.clave)
      .set(producto, { merge: true });

    producto.cantidad = cantidad;

    return r;
  }

  delete(id: string): Promise<void>{
    return this.afs.doc('empresa/' + EMPRESA.id)
    .collection('productos')
    .doc(id).delete();
  }

  activate(producto: Partial<Producto>): Promise<void> {
    return this.afs
      .doc('empresa/' + EMPRESA.id)
      .collection('productos')
      .doc(producto.clave)
      .set({
        activo : producto.activo,
        operacion : 'update'
      }, { merge: true });
  }

  fav(producto: Partial<Producto>): Promise<void> {
    return this.afs
      .doc('empresa/' + EMPRESA.id)
      .collection('productos')
      .doc(producto.clave)
      .set({
        favorito : producto.favorito,
        operacion : 'update'
      }, { merge: true });
  }

  getClave(clave: string): Promise<any> {
    const ref = this.afs.doc('empresa/' + EMPRESA.id).collection('productos')
      .ref;
    return ref.where('clave', '==', clave).where('activo', '==', true).get({ source: 'cache' });
  }

  getClaveAll(clave: string): Promise<any> {
    const ref = this.afs.doc('empresa/' + EMPRESA.id).collection('productos')
      .ref;
    return ref.where('clave', '==', clave).get();
  }

  getNombre(nombre: string): Promise<any> {
    const ref = this.afs.doc('empresa/' + EMPRESA.id).collection('productos')
      .ref;
    console.log('filtro' + nombre);
    const name = nombre ? nombre.toLowerCase() : ''; 
    return ref.where('nombre', '>=', name).
    where('nombre', '<', name + '\uf8ff').where('activo', '==', true).get({ source: 'cache' });
  }

  getAll(): Promise<any> {
    const ref = this.afs.doc('empresa/' + EMPRESA.id).collection('productos')
      .ref;
    return ref.where('activo', '==', true).get();
  }

  getFavorite(): Promise<any> {
    const ref = this.afs.doc('empresa/' + EMPRESA.id).collection('productos')
      .ref;
    return ref.where('favorito', '==', true).where('activo', '==', true).get();
  }

  getStockBajo(): Promise<any> {
    const ref = this.afs.doc('empresa/' + EMPRESA.id).collection('productos')
      .ref;
    return ref.where('cantidad', '<=', 10).where('activo', '==', true).get();
  }

  getAgotado(): Promise<any> {
    const ref = this.afs.doc('empresa/' + EMPRESA.id).collection('productos')
      .ref;
    return ref.where('cantidad', '<=', 0).where('activo', '==', true).get();
  }

  getCancelado(): Promise<any> {
    const ref = this.afs.doc('empresa/' + EMPRESA.id).collection('productos')
      .ref;
    return ref.where('activo', '==', false).get();
  }

  errorService(): Promise<any> {
    return this.afs.collection(`errores/${EMPRESA.id}/errores`).add(
      {
        fecha: new Date(),
        productos: JSON.stringify(PRODUCTOS_PENDIENTES),
        ventas: JSON.stringify(VENTA_PENDIENTE),
        cliente: JSON.stringify(CLIENTE_PENDIENTE)
      }
    );
  }
}
