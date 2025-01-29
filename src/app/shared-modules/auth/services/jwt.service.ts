import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class JwtService {
    private JWT_KEY: string = "jwt";
    
    readJwt(): string | null {
        return localStorage.getItem(this.JWT_KEY);
    }

    storeJwt(value: string): boolean {
        localStorage.setItem(this.JWT_KEY, value);
        return true;
    }

    removeJwt() {
        localStorage.removeItem(this.JWT_KEY);
    }

    getRole(): string {
        let token = this.readJwt();
        let role = undefined;
        if (token) {
            role = JSON.parse(atob(token.split('.')[1])).role;
        }
        return role;
    }

    getId():string{
        let token = this.readJwt();
        let id = '';
        if (token) {
            id = JSON.parse(atob(token.split('.')[1])).sub;
        }
        return id;
    }

    isLogged(): boolean {
        let token = this.readJwt();
        if (token) {
            return true;
        }
        return false;
    }
}