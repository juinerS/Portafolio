import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( ( resolve, rejects ) => {
      this.http.get('https://html-portafolio.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://html-portafolio.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      // Cargar productos
      this.cargarProductos().then( () => {
        // Se ejecuta despues de tener los productos
        // Aplicar filtro
        this.filtrarProducto(termino);
      });
    } else {
      // Aplicar filtro
      this.filtrarProducto(termino);
    }

    // this.productoFiltrado = this.productos.filter( productos => {
    //   return true;
    // })

    // console.log(this.productoFiltrado);
  }

  private filtrarProducto( termino: string ) {
    // console.log(this.productos);
    this.productoFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productoFiltrado.push(prod);
      }
    });
  }
}
