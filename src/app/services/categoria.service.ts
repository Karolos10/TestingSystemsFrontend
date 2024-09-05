import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../model/heper';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  public listarCategorias() {
    return this.http.get(`${baseUrl}/api/categorias/`);
  }

  public guardarCategoria(categoria: Categoria) {
    console.log('Datos enviados al servidor:', categoria);
    return this.http.post(`${baseUrl}/api/categorias/`, categoria);
  }
}
