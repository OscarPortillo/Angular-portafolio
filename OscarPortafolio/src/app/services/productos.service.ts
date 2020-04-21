import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  equipos: ProductoInterface[] = [];
  equipoFiltrado: ProductoInterface[] = [];

  constructor( private http: HttpClient) {
    this.cargarEquipos();
  }

  private cargarEquipos() {
    // trabajando en base a promesas
    return new Promise( (resolve, reject) => {
        this.http.get('https://angular-html-b9503.firebaseio.com/equipos_idx.json')
        .subscribe( (resp: ProductoInterface[]) => {
        this.equipos = resp;
        this.cargando = false;
        resolve(); // terminó éxitosamente
      });
    });

  }
  getEquipo( id: string) {
    return this.http.get(`https://angular-html-b9503.firebaseio.com/equipos/${ id }.json`);
  }

  buscarEquipo( termino: string) {
    if ( this.equipos.length === 0 ) {
      // cargar los productos
      this.cargarEquipos().then( () => {
        // se ejecutará después de tener los equipos
        // aplicar el filtro
        this.filtrarEquipos( termino );
      });
    } else {
      // aplicar el filtro
      this.filtrarEquipos( termino );
    }
  }

  private filtrarEquipos( termino: string) {
    // this.equipoFiltrado = this.productos.filter( producto => {
      // return true;
    // });
    // console.log(this.equipoFiltrado);
    this.equipoFiltrado = [];
    termino = termino.toLowerCase();
    this.equipos.forEach ( prod => {
      const tituloLower = prod.titulo.toLowerCase();
      const categoria = prod.categoria.toLowerCase();
      if (categoria.indexOf ( termino ) >= 0 || tituloLower.indexOf ( termino ) >= 0) {
        this.equipoFiltrado.push( prod );
      }
    });
  }
}
