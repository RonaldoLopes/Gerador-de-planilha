import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuracao } from '../_models/Configuracao';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {
  ipAddress: any;
  baseURL = 'http://138.94.52.31:8090/api/configs';

  constructor(private http: HttpClient) {}

  getAllConfiguracao(): Observable<Configuracao[]> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/configs';
      //this.baseURL = 'http://localhost:57014/api/configs';
    }
    return this.http.get<Configuracao[]>(this.baseURL);//observable 
  }
  getConfiguracaoById(id: number): Observable<Configuracao> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/configs';
      //this.baseURL = 'http://localhost:57014/api/configs';
    }
    return this.http.get<Configuracao>(`${this.baseURL}/${id}`);//observable 
  }
  getConfiguracaoByPlanta(planta: string): Observable<Configuracao[]> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/configs';
      //this.baseURL = 'http://localhost:57014/api/configs';
    }
    return this.http.get<Configuracao[]>(`${this.baseURL}/getByPlanta/${planta}`);//observable 
  }

  postConfiguracao(configuracao: Configuracao) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/configs';
      //this.baseURL = 'http://localhost:57014/api/configs';
    }
    return this.http.post(this.baseURL , configuracao);
  }
  putConfiguracao(configuracao: Configuracao) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/configs';
      //this.baseURL = 'http://localhost:57014/api/configs';
    }
    return this.http.put(`${this.baseURL}/${configuracao.id}` , configuracao);
  }
  deleteConfiguracao(id: number) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/configs';
      //this.baseURL = 'http://localhost:57014/api/configs';
    }
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
