import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Historian } from '../_models/Historian';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriansService {
  ipAddress: any;
  baseURL = 'http://138.94.52.31:8090/api/hists';

  constructor(private http: HttpClient) {
  }

  getAllHist(): Observable<Historian[]> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/hists';
      //this.baseURL = 'http://localhost:57014/api/hists';
    }
    return this.http.get<Historian[]>(this.baseURL);//observable 
  }
  getHistById(id: number): Observable<Historian> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/hists';
      //this.baseURL = 'http://localhost:57014/api/hists';
    }
    return this.http.get<Historian>(`${this.baseURL}/${id}`);//observable 
  }

  postHist(hist: Historian) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/hists';
      //this.baseURL = 'http://localhost:57014/api/hists';
    }
    return this.http.post(this.baseURL, hist);
  }
  putHist(hist: Historian) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/hists';
      //this.baseURL = 'http://localhost:57014/api/hists';
    }
    return this.http.put(`${this.baseURL}/${hist.id}` , hist);
  }
  deleteHist(id: number) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/hists';
      //this.baseURL = 'http://localhost:57014/api/hists';
    }
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
