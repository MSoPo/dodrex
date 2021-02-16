import { Cliente } from '../models/Cliente';
import { Empresa } from '../models/Empresa';
import { Producto } from '../models/Producto';
import { Usuario } from '../models/Usuario';
import { Venta } from '../models/Venta';

export const DEFAULT_DURATION = {
    duration: 3000,
  };

export const ACTIVE_BLOCK = { value : false };
export const SINCRONIZANDO = { value : false };
export const MENU = { value : 'DoDrex' };

// Patrones
export const SOLO_NUMERO_ENTERO = /^[0-9]{1,5}$/;
export const TELEFONO = /^[0-9]{7,10}$/;
export const RFC = /^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/;
export const SOLO_NUMERO_DECIMALES = /^([0-9]+\.?[0-9]{0,2})$/;

export let USER_ACTIVE: Partial<Usuario> = {};
export let EMPRESA: Partial<Empresa> = {};

// Tipo de descuento de cliente
export enum TIPO_DESCUENTO {
  SIN_DESCUENTO,
  PRECIO_ESPECIAL,
  DESCUENTO
}

// Entrega
export enum ENTREGA {
  ENTRAGADO = 1,
  ENVIO,
  RECOGER
}

// Forma de pago
export enum FORMA_PAGO {
  EFECTIVO = 1,
  TRANSFERENCIA = 2,
  ABONOS = 3
}

// Roles
export const ROL_ADMINISTRADO = { id: 1, valor: 'OFfyLKAk8fquG3aPFQ0n'};
export const ROL_INVENTARIO = {id:2, valor: '2vTiHk0ne3XTAoZK15d1'};
export const ROL_VENTAS = {id:3, valor: 'e7vD2BtuFrg9J6iEKFff'};

//Venta Actual
export let VENTAACTUAL: Venta = {fecha: new Date(), total: 0, productos: []};
export let CLIENTEACTUAL: Partial<Cliente> = {};
export const PRODUCTOS: Producto[] = [];
export const CLIENTES: Cliente[] = []; 
export const PRODUCTOS_PENDIENTES: Partial<Producto>[] = [];
export const VENTA_PENDIENTE: Venta[] = [];
export const CLIENTE_PENDIENTE: Cliente[] = [];
export const FOLIO_VENTA = { value : 0 };
export const FOLIO_ANTETRIO = { value : 0 };
export const CONFIG = { 
  reload : false,
  impresion: false,
  rutaRetorno: '',
  primeraCarga: true,
};

//URL's
export const URL_NUM_VENTA = 'https://us-central1-dodrex-23b5b.cloudfunctions.net/numVenta/V1';
export const URL_CARGA_INICIAL = 'https://us-central1-dodrex-23b5b.cloudfunctions.net/cargaInicial/V1';