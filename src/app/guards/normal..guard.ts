
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServicesService } from '../services/login-services.service';

@Injectable({
    providedIn: 'root'
})
export class NormalGuard implements CanActivate {

    constructor(private loginService: LoginServicesService, private router: Router) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.loginService.isLoggedIn() && this.loginService.getUserRole()?.includes('NORMAL')) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }

}