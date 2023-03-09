import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from '../../services/productos.service';
@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css'],
})
export class ProductoIndexComponent implements OnInit {
  productos: Producto[] = [];
  childmessage = true;
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

  deleteP(id: number) {
    this.productosService.deleteProducto(id).subscribe({
      next: () => {
        this.getProductos();
      }
    });
  }

  ngOnInit(): void {
    this.getProductos();
  }
}
