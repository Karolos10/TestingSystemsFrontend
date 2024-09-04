
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServicesService } from '../services/login-services.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private loginService: LoginServicesService, private router: Router) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // Verifica si el usuario está autenticado y tiene el rol de ADMIN
        const isLoggedIn = this.loginService.isLoggedIn();
        const isAdmin = this.loginService.getUserRole()?.includes('ADMIN');

        if (isLoggedIn && isAdmin) {
            return true;
        }

        // Redirige al usuario a la página de inicio de sesión si no está autorizado
        this.router.navigate(['login']);
        return false;
    }

}