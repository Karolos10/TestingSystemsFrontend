import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../model/heper';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../model/JwtPayload';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private httpCliente: HttpClient) { }

  public login(loginData: any) {
    return this.httpCliente.post(`${baseUrl}/auth/login`, loginData);
  }

  public saveToken(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == null || tokenStr == '') {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  /* public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  } */

  /* public getUserRole() {
    let user = this.getUser();
    // Verifica si 'user' y 'user.authorities' están definidos
    if (user && user.authorities && user.authorities.length > 0) {
      return user.authorities[0].authority;
    } else {
      // Devuelve un valor predeterminado o maneja el caso en que no haya roles
      return 'Rol no disponible';
    }
  } */

  public decryptToken(token: string) {
    return jwtDecode<JwtPayload>(token);
  }

  public getUserRole() {
    const token = this.getToken();
    if (token === null) {
      return token;
    } else {
      return this.decryptToken(token).roles;
    }
  }

  public getUserId() {
    const token = this.getToken();
    if (token === null) {
      return token;
    } else {
      return this.decryptToken(token).idUser;
    }
  }


  public getCurrentUser() {
    return this.httpCliente.get(`${baseUrl}/api/usuarios/usuario-actual`);
  }

  /* public getCurrentUser() {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpCliente.get(`${baseUrl}/api/usuarios/usuario-actual`, { headers });
  } */


}
