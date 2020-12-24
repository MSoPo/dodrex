import { Cliente } from '../models/Cliente';
import { Empresa } from '../models/Empresa';
import { Usuario } from '../models/Usuario';
import { Venta } from '../models/Venta';

export const DEFAULT_DURATION = {
    duration: 3000,
  };

export const ACTIVE_BLOCK = { value : false };

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

// Roles
export const ROL_ADMINISTRADO = { id: 1, valor: 'OFfyLKAk8fquG3aPFQ0n'};
export const ROL_INVENTARIO = {id:2, valor: '2vTiHk0ne3XTAoZK15d1'};
export const ROL_VENTAS = {id:3, valor: 'e7vD2BtuFrg9J6iEKFff'};

//Venta Actual
export let VENTAACTUAL: Venta = {fecha: new Date(), total: 0, productos: []};
export let CLIENTEACTUAL: Partial<Cliente> = {};

// Estilos notas
export const ESTILO_NOTA = `
.titulo {
  font-weight: bold;
  text-align: center;
  margin: 40px;
  margin-bottom: 0;
  color: #3f51b5;
}

.direccion {
  text-align: center;
  margin: 40px;
  margin-top: 10px; 
  font-size: 13px;
}

.datos {
  margin-left: 10vh;
  font-size: 16px;
}

.datos > div{
  margin: 20px;
}

.bold {
  font-weight: bold;
}

.folio {
  border-bottom: 2px solid;
  text-align: right;
  margin-right: 30px;
  margin-left: 30px;
}

.textleft {
  text-align: left;
}

.textrigth {
  text-align: right;
}

table {
  margin: 50px;
  width: 100%; 
  border: 1px solid;
  border-spacing: 0px;
  min-width: 500px;
}

table > tr > th {
  background-color: gray;
  padding: 7px;
}

table > tr > td{
  padding: 5px;
}

tfoot > td {
  padding: 10px;
}

.footer {
  text-align: right;
  padding: 40 px;
}`;

export const ESTILO_TICKET = `#ticlet>.titulo {
  font-weight: bold;
  text-align: center;
  color: #3f51b5;
  margin: 5px;
}

#ticlet>.direccion {
  text-align: center;
  margin: 5px;
  margin-top: 5px; 
  font-size: 13px;
}

#ticlet>.bold {
  font-weight: bold;
}

#ticlet>.folio {
  border-bottom: 2px solid;
  text-align: right;
  margin-right: 5px;
  margin-left: 5px;
}

#ticlet>.textleft {
  text-align: left;
}

#ticlet>.textrigth {
  text-align: right;
}

#ticlet>table {
  margin: 5px;
  border: 1px solid;
  border-spacing: 0px;
}

#ticlet>table > tr > td{
  padding: 2px;
}

#ticlet>tfoot > td {
  padding: 2px;
}

#ticlet>.footer {
  padding: 5 px;
  overflow-wrap: break-word;
}`;