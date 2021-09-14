import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VisitorsServiceService {

  ipAddress: any;

  constructor(private http: HttpClient){
  }
  public getIPAddress()
  {
    return this.http.get("http://api.ipify.org/?format=json");
  }
}
