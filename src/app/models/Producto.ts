export interface Producto {
    clave: string;
    nombre: string;
    descripcion: string;
    precio_unitario: number;
    precio_especial: number;
    precio_compra: number;
    precio_mayoreo: number;
    cantidad: number;
    cantidad_mayoreo: number;
    activo: boolean;
    favorito: boolean;
    operacion: string;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    usuario: string;
    error?: any;
    fraccion: boolean;
    sucursal1?: number;
    sucursal2?: number;
    sucursal3?: number;
    sucursal4?: number;
    sucursal5?: number;
}
