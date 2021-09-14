import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LMS } from '../_models/LMS';

@Injectable({
  providedIn: 'root'
})
export class LMSsService {

  ipAddress: any;

  baseURL = 'http://138.94.52.31:8090/api/lms';

  constructor(private http: HttpClient) {}

  getAllLMS(): Observable<LMS[]> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/lms';
      //this.baseURL = 'http://localhost:57014/api/lms';
    }
    return this.http.get<LMS[]>(this.baseURL);//observable 
  }
  getLMSById(id: number): Observable<LMS> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/lms';
      //this.baseURL = 'http://localhost:57014/api/lms';
    }
    return this.http.get<LMS>(`${this.baseURL}/${id}`);//observable 
  }

  postLMS(hist: LMS) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/lms';
      //this.baseURL = 'http://localhost:57014/api/lms';
    }
    return this.http.post(this.baseURL, hist);
  }
  putLMS(hist: LMS) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/lms';
      //this.baseURL = 'http://localhost:57014/api/lms';
    }
    return this.http.put(`${this.baseURL}/${hist.id}` , hist);
  }
  deleteLMS(id: number) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/lms';
      //this.baseURL = 'http://localhost:57014/api/lms';
    }
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
