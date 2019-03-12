import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authenticationService.currentUserValue;
        if (request.url=="http://localhost:8000/oauth/token"){
           
          
            console.log(JSON.stringify(request))
            return next.handle(request);
        }
        // add authorization header with jwt token if available
        
        else if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }

        return next.handle(request);
    }
}