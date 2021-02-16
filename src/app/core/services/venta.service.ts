import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { merge, Observable } from 'rxjs';
import { Venta } from 'src/app/models/Venta';
import { EMPRESA, ENTREGA, URL_NUM_VENTA } from '../Constantes';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private afs: AngularFirestore, private httpCliente: HttpClient) { }

  add(venta: Venta): Promise<any>{
    return this.validVenta().add(venta);
  }

  entrega(venta: Venta): Promise<any>{
    return this.validVenta().doc(venta.id).set({
      operacion: 'entrega',
      entrega: '1'
    }, { merge: true });
  }

  validVenta(): CollectionReference{
    return this.afs.doc('empresa/' + EMPRESA.id).collection('ventas').ref;
  }

  cancelVenta(idVenta: string): Promise<any>{
    return this.validVenta().doc(idVenta).delete();
  }

  getFecha(fi: Date, ff: Date, clave_cliente: string, clave_usuario: string, formaPago?: number): Promise<any>{
    ff.setHours(23);ff.setMinutes(59);ff.setSeconds(59);
    fi.setHours(0);fi.setMinutes(0);fi.setSeconds(0);
    const ventas = this.afs.doc('empresa/' + EMPRESA.id).collection('ventas').ref;
    //Se tiene que poner todo el filtro en una sola linea si no, no lo toma en cuenta
    let filtros = ventas.where('fecha', '>=', fi).where('fecha', '<=', ff);

    if(formaPago){
      filtros = ventas.where('fecha', '>=', fi).where('fecha', '<=', ff).
      where('formaPago', '==', formaPago);
      return filtros.get();
    }

    if(clave_cliente && clave_cliente != '-1'){
      if(clave_cliente == '-2'){
        clave_cliente = '';
      }
      filtros = ventas.where('fecha', '>=', fi).where('fecha', '<=', ff).
      where('id_cliente', '==', clave_cliente);
      if(clave_usuario && clave_usuario != '-1'){
        filtros = ventas.where('fecha', '>=', fi).where('fecha', '<=', ff).
        where('id_cliente', '==', clave_cliente).
        where('id_usuario', '==', clave_usuario);
      }
    }else if(clave_usuario && clave_usuario != '-1'){
      filtros = ventas.where('fecha', '>=', fi).where('fecha', '<=', ff).
        where('id_usuario', '==', clave_usuario);
    }
    
    return filtros.get();
  }

  getEntrega(): Promise<any>{
    const ventas = this.afs.doc('empresa/' + EMPRESA.id).collection('ventas').ref;
    //Se tiene que poner todo el filtro en una sola linea si no, no lo toma en cuenta
    let filtros = ventas.
      where('entrega', '>', ENTREGA.ENTRAGADO);
      return filtros.get();
  
  }

  getAllCancelada(): Promise<any>{
    const ventas = this.afs.doc('empresa/' + EMPRESA.id).collection('ventaCancelada').ref;
    return ventas.get();
  }

  getFolio(): Observable<any>{
    const objPost = {
      data: {
          idEmpresa: EMPRESA.id
      }
    };
    return this.httpCliente.post<any>(URL_NUM_VENTA, objPost);
  }
}
