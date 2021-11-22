export class BusquedaUsuario {

    tipoCliente: boolean;
    bloqueado: boolean;
    textoBusqueda: string;

    constructor(tipoCliente: boolean, bloqueado: boolean, textoBusqueda: string)
    {
        this.tipoCliente = tipoCliente;
        this.bloqueado = bloqueado;
        this.textoBusqueda = textoBusqueda;
    }
}
