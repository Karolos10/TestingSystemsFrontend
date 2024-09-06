import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../model/heper';

@Injectable({
  providedIn: 'root'
})
export class ExamenServiceService {

  constructor(private http: HttpClient) { }

  public listarExamenes() {
    return this.http.get(`${baseUrl}/api/examen/`);
  }
}
