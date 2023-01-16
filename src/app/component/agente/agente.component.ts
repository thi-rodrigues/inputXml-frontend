import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AgenteService } from './../../service/agente.service';
import { AgenteProjection } from './../../models/agenteProjection';
import { Regiao } from './../../models/regiao';

@Component({
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css']
})
export class AgenteComponent implements OnInit  {

  selectedFiles?: FileList;
  currentFile?: File;
  
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  progress = 0;
  spinner = true;

  agenteProjection: AgenteProjection[] = [];

  regiaoProjection: Regiao[] = [];

  regiaoSelecinada = '';

  displayedColumns: string[] = ['codigo', 'data', 'regiao', 'geracao', 'compra', 'precoMedio'];

  resultsLength = 0;

  constructor(private agenteService: AgenteService){}

  ngOnInit() {
    this.agenteService.buscarRegioes().subscribe(data => {
      for (let r of data) {
        this.regiaoProjection?.push({value: r.regiao, viewValue: r.regiao});
      } 
    });

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.agenteService.upload(this.currentFile).subscribe(event => {
          this.mode = 'indeterminate';
          if (event.type === HttpEventType.Response) {
              this.progress = 0;
              this.mode = 'determinate';
          }
        }, erro => {
          console.log(erro);
        });
      }
    }
  }

  buscarPorRegiao(regiao: string) {
    this.agenteService.buscarPorRegiao(regiao).subscribe(data => {
      this.agenteProjection = data;
      this.resultsLength =  this.agenteProjection.length;
    });
  }


}

