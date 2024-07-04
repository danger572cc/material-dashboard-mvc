import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ClientResponse } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly httpClient = inject(HttpClient);

  getClients(
    strategy: string,
    page: number,
    limit: number
  ): Observable<ClientResponse> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    const params = new HttpParams().append('strategyGetData', strategy);

    return this.httpClient.get<ClientResponse>(
      `${environment.apiUrl}/api/clients?page=${page}&limit=${limit}`,
      { headers, params }
    );
  }
}
