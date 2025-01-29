import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(public httpClient: HttpClient) {
    }

    get(url: string, options?: any) {
        return this.httpClient
            .get(url, options);
            //.pipe(tap((x) => this.handleResponse(x)));
    }

    post(url: string, data: any, options?: any) {
        return this.httpClient
            .post(url, data, options);
            //.pipe(tap((x) => this.handleResponse(x)));
    }

    delete(url: string, options?: any) {
        return this.httpClient
            .delete(url, options);
            //.pipe(tap((x) => this.handleResponse(x)));
    }

    put(url: string, data: any, options?: any) {
        return this.httpClient
            .put(url, data, options);
            //.pipe(tap((x) => this.handleResponse(x)));
    }

    handleResponse(response: any) {
        if (response.Status === 500) {
            alert("Si è verificato un errore durante la richiesta!");
        }
    }
}