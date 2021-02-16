import { Usuario } from './Usuario';

export interface Empresa{
    id: string;
    razon_social: string;
    id_usuario: string;
    direccion: string;
    rfc: string;
    operacion: string;
    telefono?: string;
    correo?: string;
    impresion?: number;
    head?: string;
    urlImage?: string;
    porc_unitario?: number,
    porc_mayoreo?: number,
    porc_especial?: number,
    cant_mayoreo?: number
}
