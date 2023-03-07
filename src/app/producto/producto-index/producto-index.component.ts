import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from '../../services/productos.service';
@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css'],
})
export class ProductoIndexComponent implements OnInit {
  // {
  //   Id: 3,
  //   Nombre: 'XDXDXD',
  //   Detalle: 'xdxdxd',
  //   Precio: 2500,
  //   Descuento: false,
  //   Id_Categoria: 1,
  //   Imagen: 'qqqqqq',
  // },
  // {
  //   Id: 4,
  //   Nombre: 'XDXDXDaA',
  //   Detalle: 'xdxdxdaA',
  //   Precio: 2500,
  //   Descuento: false,
  //   Id_Categoria: 1,
  //   Imagen: 'qqqqqq',
  // },

  productos: Producto[] = [];
  constructor(private productosService: ProductosService) {}

  getProductos() {
    this.productosService.getAllProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  ngOnInit(): void { this.getProductos();}
}
