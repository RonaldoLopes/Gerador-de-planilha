import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VisitorsServiceService } from './_services/visitorsService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private http: HttpClient,
    private router: Router,
    private ip: VisitorsServiceService,
    ) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('access');
    this.router.navigate(['/user/login']);
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/user/login']);
    }

  }

}