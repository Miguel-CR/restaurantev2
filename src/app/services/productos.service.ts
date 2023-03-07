import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto.model';
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}
  getAllProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseApiUrl + 'api/Pruducto');
  }
// api/Pruducto/1
  getProductoById(id: number): Observable<Producto> {
    console.log(this.baseApiUrl + 'api/Pruducto/' + id.toString());

    return this.http.get<Producto>( this.baseApiUrl + 'api/Pruducto/' + id.toString());
  }

  createProducto(addProducto: Producto): Observable<Producto> {
    addProducto.imagen = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
    return this.http.post<Producto>(
      this.baseApiUrl + 'api/Pruducto/create',
      addProducto
    );
  }

  updateProducto(uProducto: Producto): Observable<Producto> {
    uProducto.imagen = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
    return this.http.put<Producto>(
      this.baseApiUrl + 'api/Pruducto/update',
      uProducto
    );
  }
}
