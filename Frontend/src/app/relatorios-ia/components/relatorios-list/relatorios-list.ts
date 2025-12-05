import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RelatorioIAService } from '../../services/relatorio-ia.service';
import {
  RelatorioResponse,
  RelatorioFilterRequest,
  TipoRelatorio,
  StatusRelatorio,
  PagedResponse
} from '../../../models/relatorio-ia.models';
import {
  ZardTableComponent,
  ZardTableHeaderComponent,
  ZardTableBodyComponent,
  ZardTableRowComponent,
  ZardTableHeadComponent,
  ZardTableCellComponent,
} from '@shared/components/table/table.component';
import { ZardPaginationComponent } from '@shared/components/pagination/pagination.component';
import { ZardSelectComponent } from '@shared/components/select/select.component';
import { ZardSelectItemComponent } from '@shared/components/select/select-item.component';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardCardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-relatorios-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DatePipe,
    ZardTableComponent,
    ZardTableHeaderComponent,
    ZardTableBodyComponent,
    ZardTableRowComponent,
    ZardTableHeadComponent,
    ZardTableCellComponent,
    ZardPaginationComponent,
    ZardSelectComponent,
    ZardSelectItemComponent,
    ZardButtonComponent,
    ZardCardComponent
  ],
  templateUrl: './relatorios-list.html',
  styleUrl: './relatorios-list.css'
})
export class RelatoriosListComponent implements OnInit {
  relatorios = signal<RelatorioResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  
  currentPage = signal(1);
  itemsPerPage = signal(20);
  itemsPerPageOptions = [10, 20, 50, 100];
  totalElements = signal(0);
  totalPages = computed(() => Math.ceil(this.totalElements() / this.itemsPerPage()));
  
  filtros: RelatorioFilterRequest = {};
  tipoRelatorioSelecionado = signal<string>('');
  statusSelecionado = signal<string>('');
  
  TipoRelatorio = TipoRelatorio;
  StatusRelatorio = StatusRelatorio;
  tiposRelatorio = Object.values(TipoRelatorio);
  statusRelatorio = Object.values(StatusRelatorio);
  
  paginationInfo = computed(() => {
    const total = this.totalElements();
    const itemsPerPage = this.itemsPerPage();
    const currentPage = this.currentPage();
    const start = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, total);
    return { start, end, total, currentPage, totalPages: this.totalPages() };
  });
  
  paginatedRelatorios = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.relatorios().slice(start, end);
  });

  constructor(
    private relatorioIAService: RelatorioIAService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarRelatorios();
  }

  carregarRelatorios(): void {
    this.loading.set(true);
    this.error.set(null);

    const page = this.currentPage() - 1; // Backend usa 0-based
    const size = this.itemsPerPage();

    this.relatorioIAService.listar(this.filtros, page, size).subscribe({
      next: (response: PagedResponse<RelatorioResponse>) => {
        this.relatorios.set(response.content);
        this.totalElements.set(response.totalElements);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar relatórios. Tente novamente.');
        this.loading.set(false);
        console.error('Erro ao carregar relatórios:', err);
      }
    });
  }

  aplicarFiltros(): void {
    this.filtros = {};
    const tipo = this.tipoRelatorioSelecionado();
    const status = this.statusSelecionado();
    
    if (tipo) {
      this.filtros.tipoRelatorio = tipo as TipoRelatorio;
    }
    if (status) {
      this.filtros.status = status as StatusRelatorio;
    }
    this.currentPage.set(1);
    this.carregarRelatorios();
  }

  limparFiltros(): void {
    this.tipoRelatorioSelecionado.set('');
    this.statusSelecionado.set('');
    this.filtros = {};
    this.currentPage.set(1);
    this.carregarRelatorios();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.carregarRelatorios();
  }

  onItemsPerPageChange(value: string | string[]): void {
    const newValue = Array.isArray(value) ? parseInt(value[0], 10) : parseInt(value as string, 10);
    if (!isNaN(newValue) && newValue > 0) {
      this.itemsPerPage.set(newValue);
      this.currentPage.set(1);
      this.carregarRelatorios();
    }
  }

  onTipoChange(value: string | string[]): void {
    const newValue = Array.isArray(value) ? value[0] : value;
    this.tipoRelatorioSelecionado.set(newValue);
  }

  onStatusChange(value: string | string[]): void {
    const newValue = Array.isArray(value) ? value[0] : value;
    this.statusSelecionado.set(newValue);
  }

  visualizarRelatorio(id: string): void {
    this.router.navigate(['/relatorios-ia', id]);
  }

  gerarRelatorioCustomizado(): void {
    this.router.navigate(['/relatorios-ia/gerar']);
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleString('pt-BR');
  }

  getStatusBadgeClass(status: StatusRelatorio): string {
    switch (status) {
      case StatusRelatorio.CONCLUIDO:
        return 'bg-green-100 text-green-800';
      case StatusRelatorio.GERANDO:
        return 'bg-yellow-100 text-yellow-800';
      case StatusRelatorio.ERRO:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getTipoRelatorioLabel(tipo: TipoRelatorio): string {
    const labels: Record<TipoRelatorio, string> = {
      [TipoRelatorio.DIARIO]: 'Diário',
      [TipoRelatorio.SEMANAL]: 'Semanal',
      [TipoRelatorio.MENSAL]: 'Mensal',
      [TipoRelatorio.CUSTOMIZADO]: 'Customizado'
    };
    return labels[tipo] || tipo;
  }
}

