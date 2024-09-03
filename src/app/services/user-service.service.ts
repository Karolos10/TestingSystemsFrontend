import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../model/heper';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }

  public añadirUsuario(user: any) {
    return this.httpClient.post(`${baseUrl}/api/usuarios/post`, user);
  }
}
