import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';
@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}
  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseApiUrl + 'api/Categoria');
  }
}
