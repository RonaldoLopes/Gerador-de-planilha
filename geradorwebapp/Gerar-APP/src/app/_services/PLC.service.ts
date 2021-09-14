import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PLC } from '../_models/PLC';

@Injectable({
  providedIn: 'root'
})
export class PLCService {
  ipAddress: any;
  baseURL = 'http://138.94.52.31:8090/api/plcs';

  constructor(private http: HttpClient) {
   }

  getAllPLC(): Observable<PLC[]> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/plcs';
      //this.baseURL = 'http://localhost:57014/api/plcs';
    }
    return this.http.get<PLC[]>(this.baseURL);//observable 
  }
  getPLCById(id: number): Observable<PLC> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/plcs';
      //this.baseURL = 'http://localhost:57014/api/plcs';
    }
    return this.http.get<PLC>(`${this.baseURL}/${id}`);//observable 
  }

  postPLC(plc: PLC) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/plcs';
      //this.baseURL = 'http://localhost:57014/api/plcs';
    }
    return this.http.post(this.baseURL, plc);
  }
  putPLC(plc: PLC) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/plcs';
      //this.baseURL = 'http://localhost:57014/api/plcs';
    }
    return this.http.put(`${this.baseURL}/${plc.id}` , plc);
  }
  deletePLC(id: number) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/plcs';
      //this.baseURL = 'http://localhost:57014/api/plcs';
    }
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
