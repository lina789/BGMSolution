import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let tokenRecived = localStorage.getItem('token');
        if (tokenRecived) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${tokenRecived}`
                }
            });
        }

        return next.handle(request);
    }
}