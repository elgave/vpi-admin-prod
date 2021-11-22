export class Usuario {

    email: string;
    nombre: string;
    direccion: string;
    celular: string;
    bloqueado: string;
    fechaCreacion: Date;
    calificacionGlobal: number;

    constructor(email: string, nombre: string, direccion: string, celular: string, bloqueado: string,
        fechaCreacion: Date, calificacionGlobal: number)
    {
       this.email = email;
       this.nombre = nombre;
       this.direccion = direccion;
       this.celular = celular;
       this.bloqueado = bloqueado;
       this.fechaCreacion = fechaCreacion;
       this.calificacionGlobal = calificacionGlobal;
    }
}
