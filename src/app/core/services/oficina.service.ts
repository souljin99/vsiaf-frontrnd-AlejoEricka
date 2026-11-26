import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  EstadoRequest,
  OficinaRequest,
  OficinaResponse,
} from '@features/oficinas/models/oficina.model';

@Injectable({ providedIn: 'root' })
export class OficinaService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/api/oficinas`;

  listar(): Observable<OficinaResponse[]> {
    return this.http.get<OficinaResponse[]>(this.url);
  }

  obtener(codOfic: number): Observable<OficinaResponse> {
    return this.http.get<OficinaResponse>(`${this.url}/${codOfic}`);
  }

  crear(body: OficinaRequest): Observable<OficinaResponse> {
    return this.http.post<OficinaResponse>(this.url, body);
  }

  modificar(codOfic: number, body: OficinaRequest): Observable<OficinaResponse> {
    return this.http.put<OficinaResponse>(`${this.url}/${codOfic}`, body);
  }

  cambiarEstado(codOfic: number, activo: boolean): Observable<OficinaResponse> {
    const body: EstadoRequest = { activo };
    return this.http.patch<OficinaResponse>(`${this.url}/${codOfic}/estado`, body);
  }
}