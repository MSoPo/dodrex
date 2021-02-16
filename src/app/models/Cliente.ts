export interface Cliente {
    clave: string;
    nombre: string;
    descuento: number;
    direccion: string;
    activo: boolean;
    favorito: boolean;
    operacion: string;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    usuario: string;
    tipo_descuento: number;
    telefono?: string;
    correo?: string;
    error?: any;
}
