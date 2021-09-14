import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { VisitorsServiceService } from './visitorsService.service';
import { User } from '../_models/User';
import { Role } from '../_models/Role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService  {

  ipAddress: any;

  baseURL = 'http://138.94.52.31:8090/api/logins/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {  }


  login(model: any) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/logins/';
      //this.baseURL = 'http://localhost:57014/api/logins/';
    }
    return this.http
      .post(`${this.baseURL}login`, model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            sessionStorage.setItem('username', this.decodedToken.unique_name);
          }
        })
      );
  }
  getAllUser(): Observable<User[]> {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/logins/getAllUser';
      //this.baseURL = 'http://localhost:57014/api/logins/getAllUser';
    }
    return this.http.get<User[]>(this.baseURL);//observable 
  }
  register(model: any) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/logins/';
      //this.baseURL = 'http://localhost:57014/api/logins/';
      return this.http.post(`${this.baseURL}Register`, model);
    }
    return this.http.post(`${this.baseURL}Register`, model);
  }
  putUserRole(role: Role) {
    if (localStorage.getItem('access') === 'interno') {
      this.baseURL = 'http://192.168.0.248:8090/api/Role/UpdateUserRole';
      //this.baseURL = 'http://localhost:57014/api/Role/UpdateUserRole';
    }
    return this.http.put(`${this.baseURL}/` , role);
    //return this.http.put(`${this.baseURL}` , user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
