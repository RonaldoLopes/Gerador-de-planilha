import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  entrar() {
    this.router.navigate(['/user/login']);
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('access');
    this.toastr.show('Log Out');
    this.router.navigate(['/user/login']);
  }
  userName() {
    return sessionStorage.getItem('username');
  }

}