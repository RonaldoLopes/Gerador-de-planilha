import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UM } from '../_models/UM';
import { Observable } from 'rxjs';
import { VisitorsServiceService } from './visitorsService.service';

declare let ClientIP: any;

@Injectable({
  providedIn: 'root'
})

export class UMsService {
  
  ipaddress: string = '';

  ipAddress: any;

  baseURL = 'http://138.94.52.31:8090/api/ums';

  constructor(private http: HttpClient) {}

  getAllUM(): Observable<UM[]> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/ums';
      //this.baseURL = 'http://localhost:57014/api/ums';
    }
    return this.http.get<UM[]>(this.baseURL);//observable 
  }
  getUMById(id: number): Observable<UM[]> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/ums';
      //this.baseURL = 'http://localhost:57014/api/ums';
    }
    return this.http.get<UM[]>(`${this.baseURL}/${id}`);//observable 
  }
  getUMByDescricao(um: string): Observable<UM[]> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/ums';
      //this.baseURL = 'http://localhost:57014/api/ums';
    }
    return this.http.get<UM[]>(`${this.baseURL}/getByDescricao/${um}`);//observable 
  }
  postUM(um: UM) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/ums';
      //this.baseURL = 'http://localhost:57014/api/ums';
    }
    return this.http.post(this.baseURL , um);
  }
  putUM(um: UM) {
    if (localStorage.getItem('access') === 'interno') {
      //this.baseURL = 'http://192.168.0.248:8090/api/ums';
      this.baseURL = 'http://localhost:57014/api/ums';
    }
    return this.http.put(`${this.baseURL}/${um.id}` , um);
  }
  deleteUM(um: UM) {
    if (localStorage.getItem('access') === 'interno') {
      //this.baseURL = 'http://192.168.0.248:8090/api/ums';
      this.baseURL = 'http://localhost:57014/api/ums';
    }
    return this.http.delete(`${this.baseURL}/${um.id}`);
  }

}
