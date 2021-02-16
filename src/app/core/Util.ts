import { EMPRESA, USER_ACTIVE, PRODUCTOS, CLIENTES, CONFIG } from "./Constantes";

export function clearLogout(){
    delete USER_ACTIVE.activo;
    delete USER_ACTIVE.correo;
    delete USER_ACTIVE.id;
    delete USER_ACTIVE.id_empresa;
    delete USER_ACTIVE.id_rol;
    delete USER_ACTIVE.nombre;
    delete EMPRESA.correo;
    delete EMPRESA.direccion;
    delete EMPRESA.id;
    delete EMPRESA.id_usuario;
    delete EMPRESA.operacion;
    delete EMPRESA.razon_social;
    delete EMPRESA.rfc;
    delete EMPRESA.telefono;
    delete EMPRESA.correo;
    delete EMPRESA.impresion;
    delete EMPRESA.head;
    delete EMPRESA.urlImage;
    delete EMPRESA.porc_unitario;
    delete EMPRESA.porc_mayoreo;
    delete EMPRESA.porc_especial;
    delete EMPRESA.cant_mayoreo;
    PRODUCTOS.length = 0;
    CLIENTES.length = 0;
    CONFIG.reload = false;
    CONFIG.impresion = false,
    CONFIG.rutaRetorno = '',
    CONFIG. primeraCarga = true;
  }

  function decimalAdjust(value: any, exp: any) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math.round(value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  };

 //Round decumal
  export const round10 = function(value: any, exp: any) {
      return decimalAdjust(value, exp);
    };