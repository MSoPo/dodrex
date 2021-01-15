export interface VentaPagos{
    id: string;
    pagoTotal: number;
    pagoInicial: number;
    deuda: number;
    fecha: Date;
    cliente: string;
    id_cliente: string;
}
