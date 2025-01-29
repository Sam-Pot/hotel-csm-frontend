import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtService } from "../services/jwt.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private readonly jwtService: JwtService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string | null = this.jwtService.readJwt();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    //'Content-Type': 'application/json'
                }
            });
        }
        return next.handle(request);
    }
}