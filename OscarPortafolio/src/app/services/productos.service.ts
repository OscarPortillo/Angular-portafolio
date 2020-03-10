import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productoFiltrado: ProductoInterface[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    // trabajando en base a promesas
    return new Promise( (resolve, reject) => {
        this.http.get('https://angular-html-b9503.firebaseio.com/productos_idx.json')
        .subscribe( (resp: ProductoInterface[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve(); // terminó éxitosamente
      });
    });

  }
  getProducto( id: string) {
    console.log(id);
    return this.http.get(`https://angular-html-b9503.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string) {
    if ( this.productos.length === 0 ) {
      // cargar los productos
      this.cargarProductos().then( () => {
        // se ejecutará después de tener los productos
        // aplicar el filtro
        this.filtrarProductos( termino );
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string) {
    // this.productoFiltrado = this.productos.filter( producto => {
      // return true;
    // });
    // console.log(this.productoFiltrado);
    this.productoFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach ( prod => {
      const tituloLower = prod.titulo.toLowerCase();
      const categoria = prod.categoria.toLowerCase();
      if (categoria.indexOf ( termino ) >= 0 || tituloLower.indexOf ( termino ) >= 0) {
        this.productoFiltrado.push( prod );
      }
    });
  }
}
