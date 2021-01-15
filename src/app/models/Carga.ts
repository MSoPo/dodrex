import { DetalleVenta } from "./DetalleVenta";

export interface Carga{
    id?: string;
    fecha: Date | any;
    total: number;
    productos: DetalleVenta[];
    id_usuario?: string;
    nombre_usuario?: string;
}