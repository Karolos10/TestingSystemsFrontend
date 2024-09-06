import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../model/heper';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http: HttpClient) { }

  public listarPreguntasExamen(exameneId: any) {
    return this.http.get(`${baseUrl}/api/pregunta/examen/todos/${exameneId}`);
  }

  public guardarPregunta(pregunta: any) {
    return this.http.post(`${baseUrl}/api/pregunta/`, pregunta);
  }
}
