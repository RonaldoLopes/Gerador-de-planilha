import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ambev } from '../_models/Ambev';

@Injectable({
  providedIn: 'root'
})
export class AmbevsService {
  ipAddress: any;
  baseURL = 'http://138.94.52.31:8090/api/ambevs';

  constructor(private http: HttpClient) {}

  getAllAmbev(): Observable<Ambev[]> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/ambevs';
      //this.baseURL = 'http://localhost:57014/api/ambevs';
    }
    return this.http.get<Ambev[]>(this.baseURL);
  }
  getAmbevById(id: number): Observable<Ambev> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/ambevs';
      //this.baseURL = 'http://localhost:57014/api/ambevs';
    }
    return this.http.get<Ambev>(`${this.baseURL}/${id}`);//observable 
  }
  postAmbev(ambev: Ambev) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/ambevs';
      //this.baseURL = 'http://localhost:57014/api/ambevs';
    }
    return this.http.post(this.baseURL, ambev);
  }
  putAmbev(ambev: Ambev) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/ambevs';
      //this.baseURL = 'http://localhost:57014/api/ambevs';
    }
    return this.http.put(`${this.baseURL}/${ambev.id}` , ambev);
  }
  deleteAmbev(id: number) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/ambevs';
      //this.baseURL = 'http://localhost:57014/api/ambevs';
    }
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
