import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../service/auth";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-singup',
    imports: [
        FormsModule
    ],
  templateUrl: './singup.html',
  styleUrl: './singup.css',
})
export class Singup {
    name = '';
    email = '';
    password = '';
    confirmPassword = '';

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {}

    onSubmit() {
        this.http.post<{ token: string }>('colocar endpoit aqui', {
            name: this.name,
            email: this.email,
            password: this.password
        }).subscribe({
            next: ({ token }) => this.authService.login(token),
            error: () => alert('Erro ao cadastrar')
        });
    }
}
