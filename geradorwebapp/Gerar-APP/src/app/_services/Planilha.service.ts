import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanilhaService {

  ipAddress: any;
  baseURL = 'http://138.94.52.31:8090/api/configs';

  constructor(private http: HttpClient) { }

  getLmsIdPlanilha(id: number): Observable<any> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/planilhas';
      //this.baseURL = 'http://localhost:57014/api/planilhas';
    }
    return this.http.get(`${this.baseURL}/lms/${id}`);//observable 
  }
  getHistIdPlanilha(id: number): Observable<any> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/planilhas';
      //this.baseURL = 'http://localhost:57014/api/planilhas';
    }
    return this.http.get(`${this.baseURL}/hist/${id}`);//observable 
  }
  getHistPLIdPlanilha(id: number): Observable<any> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/planilhas';
      //this.baseURL = 'http://localhost:57014/api/planilhas';
    }
    return this.http.get(`${this.baseURL}/histpl/${id}`);//observable 
  }
  getPlcIdPlanilha(id: number): Observable<any> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/planilhas';
      //this.baseURL = 'http://localhost:57014/api/planilhas';
    }
    return this.http.get(`${this.baseURL}/plc/${id}`);//observable 
  }
  getAmbevIdPlanilha(id: number): Observable<any> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/planilhas';
      //this.baseURL = 'http://localhost:57014/api/planilhas';
    }
    return this.http.get(`${this.baseURL}/ambevByPlId/${id}`);//observable 
  }
  getIGSIdPlanilha(id: number): Observable<any> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/planilhas';
      //this.baseURL = 'http://localhost:57014/api/planilhas';
    }
    return this.http.get(`${this.baseURL}/igs/${id}`);//observable 
  }

}
