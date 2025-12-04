import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    constructor(private router: Router) {}

    login(token: string) {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
