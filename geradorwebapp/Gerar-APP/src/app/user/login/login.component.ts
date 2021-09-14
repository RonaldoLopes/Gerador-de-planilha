import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { VisitorsServiceService } from 'src/app/_services/visitorsService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Login';
  model: any = {};
  spinnerLogin: false;

  constructor(public router: Router,
              private authService: AuthService,
              private toastr: ToastrService,
              private ip: VisitorsServiceService) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/']);
    }
    this.ip.getIPAddress().subscribe((res:any) => {
      if (res.ip === '138.94.52.31') {
        localStorage.setItem('access', 'interno');
      } else {
        localStorage.setItem('access', 'externo');
      }
    });
  }

  login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.router.navigate(['/']);
        this.toastr.success('Usuário logado com sucesso.');
        this.spinnerLogin = false;
      },
      error => {
        this.spinnerLogin = false;
        this.toastr.error('Falha ao tentar logar');
        console.log(error);
      }
    );
  }
  spinnerShow(ativo) {
    this.spinnerLogin = ativo;
  }

}
