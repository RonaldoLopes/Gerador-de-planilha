import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  dataToken: any[];

  constructor(
    private router: Router,
    //private jwtHelperService: JwtHelperService
    private toastr: ToastrService,
    ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') !== null) {

      try {
        const token = localStorage.getItem('token');
        this.dataToken = (jwt_decode(token));

        if (this.dataToken["role"] === 'Admin'){
          return true;
        }
        else {
          const accessGranted = next["url"][0]["path"];

          if (
              accessGranted === 'plcnew' ||
              accessGranted === 'plcview' ||
              accessGranted === 'plc' ||
              accessGranted === 'histnew' ||
              accessGranted === 'histview' ||
              accessGranted === 'hist' ||
              accessGranted === 'lmsview' ||
              accessGranted === 'lmsnew' ||
              accessGranted === 'lms' ||
              accessGranted === 'plan' ||
              accessGranted === 'igsview' ||
              accessGranted === 'igsnew' ||
              accessGranted === 'igs'
          ) {
            return true;
          }
          this.toastr.info('Usuário sem acesso');
          return false;
        }
        //console.log(this.dataToken["role"]);
      } catch (Error  ){
        console.log(Error);
        return null;
      }
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }

}
