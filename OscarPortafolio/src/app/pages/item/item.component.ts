import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  equipo: ProductoDescripcion;
  id: string;
  constructor( private route: ActivatedRoute,
               public productoService: ProductosService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe( parametros => {
      this.productoService.getEquipo(parametros.id)
      .subscribe( (equipo: ProductoDescripcion) => {
        this.id = parametros.id;
        this.equipo = equipo;
      });
    });
  }

}
