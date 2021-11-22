export class Menu {

    nombre: string;
    categoria: string;
    promocion: boolean;
    descripcion: string;
    costo: number;
    descuento: number;
    imagen: string;
    idMenu: number;
    

    constructor(idMenu: number, nombre: string, categoria: string, promocion: boolean,
        descripcion: string, costo: number, descuento: number, imagen: string)
        {
            this.idMenu = idMenu;
            this.nombre = nombre;
            this.categoria = categoria;
            this.promocion = promocion;
            this.descripcion = descripcion;
            this.costo = costo;
            this.descuento = descuento;
            this.imagen = imagen;
     
    }

}
