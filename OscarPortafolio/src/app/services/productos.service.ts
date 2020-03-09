import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-html-b9503.firebaseio.com/productos_idx.json')
    .subscribe( (resp: ProductoInterface[]) => {
      this.productos = resp;
      this.cargando = false;
      console.log(this.productos);
    });

  }
}