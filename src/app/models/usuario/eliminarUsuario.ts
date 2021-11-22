export class EliminarUsuario {

    cliente: boolean;
    idUsuario: string;

    constructor(cliente: boolean, idUsuario: string)
    {
        this.cliente = cliente;
        this.idUsuario = idUsuario;
    }
}
