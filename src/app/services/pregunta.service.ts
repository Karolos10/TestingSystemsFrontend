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

  public eliminarPregunta(preguntaId: any) {
    return this.http.delete(`${baseUrl}/api/pregunta/${preguntaId}`);
  }

  public actualizarPregunta(pregunta: any) {
    return this.http.put(`${baseUrl}/api/pregunta/`, pregunta);
  }

  public obtenerPregunta(preguntaId: any) {
    return this.http.get(`${baseUrl}/api/pregunta/${preguntaId}`);
  }

  public listarPreguntasDelExamenPrueba(exameneId: any) {
    return this.http.get(`${baseUrl}/api/pregunta/examen/todos/${exameneId}`);
  }

  public evaluarExamen(preguntas: any) {
    return this.http.post(`${baseUrl}/api/pregunta/evaluar-examen`, preguntas);
  }
}
