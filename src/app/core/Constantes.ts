import { Cliente } from '../models/Cliente';
import { Empresa } from '../models/Empresa';
import { Usuario } from '../models/Usuario';
import { Venta } from '../models/Venta';

export const DEFAULT_DURATION = {
    duration: 3000,
  };

export const ACTIVE_BLOCK = { value : false };
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

// Estilos notas
export const ESTILO_NOTA = `
.encabezado {
  color: black;
  margin-bottom: 10px;
}

img {
  position: absolute; 
  top: 30px; 
  left: 30px
}

.titulo {
  font-size: xx-large;
  text-align: center;
  margin: 40px;
  margin-top: 20px;
  margin-bottom: 0px;
  color: #1632cc;
}

h1 {
  font-weight: bolder;
}

.direccion {
  text-align: center;
  margin: 40px;
  margin-top: 5px; 
  margin-bottom: 5px;
}

.datos {
  margin-left: 10vh;
}

.datos > div{
  margin: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.bold {
  color: rgb(69, 69, 71);
}

.nobold {
  font-weight: normal;
  color: rgb(69, 69, 71);
}

.total {
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
  margin-top: 0px;
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
}
`;

export const ESTILO_TICKET = `#ticket>.titulo {
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  color: #3f51b5;
}

#ticket>.direccion {
  margin-top: 2px; 
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid;
}

#ticket>.bold {
  font-weight: bold;
}

.right {
    display: block;
    float: right;
}`;