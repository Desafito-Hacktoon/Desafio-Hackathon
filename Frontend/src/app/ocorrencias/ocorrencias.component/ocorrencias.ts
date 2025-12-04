import {Component, OnInit, computed, signal} from '@angular/core';
import {OcorreciasService} from '../ocorrenciasService/ocorrecias-service';
import {Router} from '@angular/router';
import {
  ZardTableComponent,
  ZardTableHeaderComponent,
  ZardTableBodyComponent,
  ZardTableRowComponent,
  ZardTableHeadComponent,
  ZardTableCellComponent,
} from '@shared/components/table/table.component';
import {ZardPaginationComponent} from '@shared/components/pagination/pagination.component';
import {Ocorrencia} from '../../models/Ocorrencia';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-ocorrencias',
  standalone: true,
  imports: [
    CommonModule,
    ZardTableComponent,
    ZardTableHeaderComponent,
    ZardTableBodyComponent,
    ZardTableRowComponent,
    ZardTableHeadComponent,
    ZardTableCellComponent,
    ZardPaginationComponent,
  ],
  templateUrl: './ocorrencias.html',
  styleUrl: './ocorrencias.css',
})
export class Ocorrencias implements OnInit {
  ocorrencias: Ocorrencia[] = [];
  currentPage = signal(1);
  itemsPerPage = signal(10);

  paginatedOcorrencias = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.ocorrencias.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.ocorrencias.length / this.itemsPerPage());
  });

  constructor(
    private ocorrenciasService: OcorreciasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ocorrenciasService.getOcorrenciasData().subscribe(data => {
      this.ocorrencias = data;
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/ocorrencias', id]);
  }
}
