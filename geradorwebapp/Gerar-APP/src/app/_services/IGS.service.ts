import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGS } from '../_models/IGS';

@Injectable({
  providedIn: 'root'
})
export class IGSService {

  ipAddress: any;
  baseURL = 'http://138.94.52.31:8090/api/igs';

  constructor(private http: HttpClient) { }

  getAllIGS(): Observable<IGS[]> {
    if (localStorage.getItem('access') === 'interno') {
       this.baseURL = 'http://192.168.0.248:8090/api/igs';
       //this.baseURL = 'http://localhost:57014/api/igs';
    }
    return this.http.get<IGS[]>(this.baseURL);//observable 
  }
  getIGSById(id: number): Observable<IGS> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/igs';
      //this.baseURL = 'http://localhost:57014/api/igs';
    }
    return this.http.get<IGS>(`${this.baseURL}/${id}`);//observable 
  }
  postIGS(igs: IGS) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/igs';
      //this.baseURL = 'http://localhost:57014/api/igs';
    }
    return this.http.post(this.baseURL , igs);
  }
  putIGS(igs: IGS) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/igs';
      //this.baseURL = 'http://localhost:57014/api/igs';
    }
    return this.http.put(`${this.baseURL}/${igs.id}` , igs);
  }
  deleteIGS(id: number) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/igs';
      //this.baseURL = 'http://localhost:57014/api/igs';
    }
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
