import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginServicesService } from "../services/login-services.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginServicesService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authRequest = req;
        const token = this.loginService.getToken(); 
        if (token != null) {
            authRequest = req.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            });
        }

        return next.handle(authRequest);
    } 

}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
     }
]