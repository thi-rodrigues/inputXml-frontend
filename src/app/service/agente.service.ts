import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agente } from '../models/agente';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/agentes/inputarNotas`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  buscarRegioes(): Observable<Agente[]> {
    return this.http.get<Agente[]>(`${this.baseUrl}/agentes/buscarRegioes`);
  }
  
  buscarPorRegiao(regiao: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/agentes/buscarPorRegiao/${regiao}`);
  }
}
