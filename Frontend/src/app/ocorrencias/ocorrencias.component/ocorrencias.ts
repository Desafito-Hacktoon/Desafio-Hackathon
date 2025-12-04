import {Component, OnInit} from '@angular/core';
import {OcorreciasService} from '../ocorrenciasService/ocorrecias-service';
import {RouterLink} from '@angular/router';
import {
  ZardTableComponent,
  ZardTableHeaderComponent,
  ZardTableBodyComponent,
  ZardTableRowComponent,
  ZardTableHeadComponent,
  ZardTableCellComponent,
} from '@shared/components/table/table.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-ocorrencias',
  imports: [
    RouterLink,
    CommonModule,
    ZardTableComponent,
    ZardTableHeaderComponent,
    ZardTableBodyComponent,
    ZardTableRowComponent,
    ZardTableHeadComponent,
    ZardTableCellComponent,
  ],
  templateUrl: './ocorrencias.html',
  styleUrl: './ocorrencias.css',
})
export class Ocorrencias implements OnInit {

  ocorrencias: any[] = [];

  constructor(private ocorrenciasService: OcorreciasService) {}

  ngOnInit() {
    this.ocorrenciasService.getOcorrenciasData().subscribe(data => {
      this.ocorrencias = data;
    });
  }
}
