
import { DetalleVenta } from './DetalleVenta';

export interface Venta{
    id?: string;
    fecha: Date | any;
    total: number;
    productos: DetalleVenta[];
    id_usuario?: string;
    nombre_usuario?: string;
    id_cliente?: string;
    nombre_cliente?: string;
    descuento?: number;
    tipo_descuento?: number;
    numero?: number;
    formaPago?: number;
    entrega?: number;
    pagoInicial?: number;
    error?: any;
    sucursal?: string;
    numeroSucursal?: number;
}
