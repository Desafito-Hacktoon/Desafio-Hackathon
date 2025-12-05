import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet, Router, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { MapModule } from './map/map.module';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HeaderComponent as ZHeaderComponent } from './shared/components/layout/header.component';
import { ContentComponent } from './shared/components/layout/content.component';
import { SidebarComponent as ZSidebarComponent, SidebarGroupComponent, SidebarGroupLabelComponent } from './shared/components/layout/sidebar.component';
import { ZardIconComponent } from './shared/components/icon/icon.component';
import { ZardButtonComponent } from './shared/components/button/button.component';
import { UserMenuComponent } from './shared/components/user-menu/user-menu.component';
import {AuthService} from "./auth/service/auth";


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
    CommonModule,
    RouterOutlet, 
    MapModule, 
    RouterLink, 
    LayoutComponent,
    ZHeaderComponent,
    ContentComponent,
    ZSidebarComponent,
    SidebarGroupComponent,
    SidebarGroupLabelComponent,
    ZardIconComponent,
    ZardButtonComponent,
    UserMenuComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('heatMap-app');
  currentPageTitle = signal('Dashboard');

  private pageTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/mapa': 'Mapa',
    '/ocorrencias': 'Ocorrências',
    '/relatorios-ia': 'Relatórios IA',
    '/relatorios-ia/gerar': 'Gerar Relatório',
    '/insights-ia': 'Insights IA',
    '/insights-ia/gerar': 'Gerar Insight'
  };

  constructor(
    public router: Router,
    public auth: AuthService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        const urlWithoutQuery = url.split('?')[0];
        this.currentPageTitle.set(this.pageTitles[urlWithoutQuery] || 'Dashboard');
      });

    const currentUrl = this.router.url;
    const urlWithoutQuery = currentUrl.split('?')[0];
    this.currentPageTitle.set(this.pageTitles[urlWithoutQuery] || 'Dashboard');
  }
}
