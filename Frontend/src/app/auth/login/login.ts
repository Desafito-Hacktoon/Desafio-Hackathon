import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../service/auth";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
    imports: [
        FormsModule
    ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    username = '';
    password = '';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {}

    onSubimit(){
        this.http.post<{token: string}>('endpoint/aqui',{
            username: this.username,
            password: this.password
        }).subscribe({
            next: ({ token }) => this.authService.login(token),
            error: () => alert('Login falhou! Verifique suas credenciais.')
        })
    }
}
