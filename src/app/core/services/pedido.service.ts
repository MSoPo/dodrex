import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Venta } from 'src/app/models/Venta';
import { EMPRESA } from '../Constantes';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private afs: AngularFirestore) { }

  add(venta: Venta): Promise<any>{
    return this.validVenta().add(venta);
  }

  validVenta(): CollectionReference{
    return this.afs.doc('empresa/' + EMPRESA.id).collection('pedidos').ref;
  }

  cancelPedido(idPedido: string): Promise<any>{
    return this.validVenta().doc(idPedido).delete();
  }

  getFecha(fi: Date, ff: Date, clave_cliente: string, clave_usuario: string): Promise<any>{
    ff.setHours(23);ff.setMinutes(59);ff.setSeconds(59);
    fi.setHours(0);fi.setMinutes(0);fi.setSeconds(0);
    const pedidos = this.afs.doc('empresa/' + EMPRESA.id).collection('pedidos').ref;
    //Se tiene que poner todo el filtro en una sola linea si no, no lo toma en cuenta
    let filtros = pedidos.where('fecha', '>=', fi).where('fecha', '<=', ff);
    if(clave_cliente && clave_cliente != '-1'){
      if(clave_cliente == '-2'){
        clave_cliente = '';
      }
      filtros = pedidos.where('fecha', '>=', fi).where('fecha', '<=', ff).
      where('id_cliente', '==', clave_cliente);
      if(clave_usuario && clave_usuario != '-1'){
        filtros = pedidos.where('fecha', '>=', fi).where('fecha', '<=', ff).
        where('id_cliente', '==', clave_cliente).
        where('id_usuario', '==', clave_usuario);
      }
    }else if(clave_usuario && clave_usuario != '-1'){
      filtros = pedidos.where('fecha', '>=', fi).where('fecha', '<=', ff).
        where('id_usuario', '==', clave_usuario);
    }
    
    return filtros.get();
  }

  allPedidos(): Promise<any>{
    const pedidos = this.afs.doc('empresa/' + EMPRESA.id).collection('pedidos').ref;
    return pedidos.get();
  }
}
