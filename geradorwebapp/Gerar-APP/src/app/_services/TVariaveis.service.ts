import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoVariavel } from '../_models/TipoVariavel';

@Injectable({
  providedIn: 'root'
})
export class TVariaveisService {

  ipAddress: any;

  baseURL = 'http://138.94.52.31:8090/api/tipovariavel';

constructor(private http: HttpClient) {}

getAllTV(): Observable<TipoVariavel[]> {
  if (localStorage.getItem('access') === 'interno') {
    this.baseURL = 'http://192.168.0.248:8090/api/tipovariavel';
    //this.baseURL = 'http://localhost:57014/api/tipovariavel';
  }
  return this.http.get<TipoVariavel[]>(this.baseURL);//observable 
}
getTVById(id: number): Observable<TipoVariavel[]> {
  if (localStorage.getItem('access') === 'interno') {
    this.baseURL = 'http://192.168.0.248:8090/api/tipovariavel';
    //this.baseURL = 'http://localhost:57014/api/tipovariavel';
  }
  return this.http.get<TipoVariavel[]>(`${this.baseURL}/${id}`);//observable 
}
getTVByDescricao(tv: string): Observable<TipoVariavel[]> {
  if (localStorage.getItem('access') === 'interno') {
    this.baseURL = 'http://192.168.0.248:8090/api/tipovariavel';
    //this.baseURL = 'http://localhost:57014/api/tipovariavel';
  }
  return this.http.get<TipoVariavel[]>(`${this.baseURL}/getByDescricao/${tv}`);//observable 
}
postTV(tv: TipoVariavel) {
  if (localStorage.getItem('access') === 'interno') {
    this.baseURL = 'http://192.168.0.248:8090/api/tipovariavel';
    //this.baseURL = 'http://localhost:57014/api/tipovariavel';
  }
  return this.http.post(this.baseURL , tv);
}
putTV(tv: TipoVariavel) {
  if (localStorage.getItem('access') === 'interno') {
    this.baseURL = 'http://192.168.0.248:8090/api/tipovariavel';
    //this.baseURL = 'http://localhost:57014/api/tipovariavel';
  }
  return this.http.put(`${this.baseURL}/${tv.id}` , tv);
}
deleteTV(id: number) {
  if (localStorage.getItem('access') === 'interno') {
    this.baseURL = 'http://192.168.0.248:8090/api/tipovariavel';
    //this.baseURL = 'http://localhost:57014/api/tipovariavel';
  }
  return this.http.delete(`${this.baseURL}/${id}`);
}

}
