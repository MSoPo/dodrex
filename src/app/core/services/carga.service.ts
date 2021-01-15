import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Carga } from 'src/app/models/Carga';
import { EMPRESA } from '../Constantes';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  constructor(private afs: AngularFirestore) { }

  add(carga: Carga): Promise<any>{
    return this.validCarga().add(carga);
  }

  validCarga(): CollectionReference{
    return this.afs.doc('empresa/' + EMPRESA.id).collection('cargas').ref;
  }

  getFecha(fi: Date, ff: Date, clave_usuario: string): Promise<any>{
    ff.setHours(23);ff.setMinutes(59);ff.setSeconds(59);
    fi.setHours(0);fi.setMinutes(0);fi.setSeconds(0);
    const cargas = this.afs.doc('empresa/' + EMPRESA.id).collection('cargas').ref;
    //Se tiene que poner todo el filtro en una sola sentencia si no, no lo toma en cuenta
    let filtros = cargas.where('fecha', '>=', fi).where('fecha', '<=', ff);
    if(clave_usuario && clave_usuario != '-1'){
      filtros = cargas.where('fecha', '>=', fi).where('fecha', '<=', ff).
        where('id_usuario', '==', clave_usuario);
    }
    
    return filtros.get();
  }
}
