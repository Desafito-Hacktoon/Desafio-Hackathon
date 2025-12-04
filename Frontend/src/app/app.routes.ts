import { Routes } from '@angular/router';
import { LeafletMapComponent } from "./map/leaflet.map/leaflet.map";
import {Dashboard} from './dashboard/dashboard.component/dashboard';
import {Ocorrencias} from './ocorrencias/ocorrencias.component/ocorrencias';
import {OcorrenciaDetalhe} from './ocorrencia-detalhe/ocorrencia-detalhe';
import {Login} from "./auth/login/login";
import {Singup} from "./auth/singup/singup";
import {authGuard} from "./auth/guards/auth-guard";
export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'singup', component: Singup },
    { path: 'mapa', component: LeafletMapComponent , canActivate: [authGuard] },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
    { path: 'ocorrencias', component: Ocorrencias, canActivate: [authGuard] },
    { path: 'ocorrencias/:id', component: OcorrenciaDetalhe, canActivate: [authGuard] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
