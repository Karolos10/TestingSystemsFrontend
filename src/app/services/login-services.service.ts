import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../model/heper';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../model/JwtPayload';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServicesService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private httpCliente: HttpClient) {}

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

  public getToken(): string | null {
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
  public decryptToken(token: string): JwtPayload {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      console.log('Decoded Token:', decodedToken);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return {} as JwtPayload;
    }
  }

  public getUserRole(): string[] {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.decryptToken(token);
        return decodedToken.roles || [];
      } catch (error) {
        console.error('Error decoding token', error);
        return [];
      }
    }
    return [];
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
}
