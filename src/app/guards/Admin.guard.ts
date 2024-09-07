
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
        const isLoggedIn = this.loginService.isLoggedIn();
        const isAdmin = this.loginService.getUserRole()?.includes('ADMIN');


        if (isLoggedIn && isAdmin) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }

}