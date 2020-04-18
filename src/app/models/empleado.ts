import { Rol } from './rol';
import { TipoContrato } from './tipoContrato';
import { PuntosVenta } from './puntoVenta';
export class empleado{

    id:number;
    nombre :string;
    correo:string
    apellido:string;
    usuario:string;
    contrasenia:string;
    foto:string;
    rol: Rol;
    // fechaInicio:Date;
    fechaFin: Date;
    tipoContrato:TipoContrato;
    PuntosVenta:PuntosVenta;
    
}