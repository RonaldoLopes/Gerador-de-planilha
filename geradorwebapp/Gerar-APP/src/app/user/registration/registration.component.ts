import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/User';
import { Role } from 'src/app/_models/Role';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [
    'id', 'userName', 'fullName', 'email', 'roleId', 'roleName', 'opcoes'
  ];

  registerForm: FormGroup;
  user: User;
  users: User[];
  role: Role = new Role();
  dataSource =  new MatTableDataSource();

  modoSalvar = 'post';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
   }

  ngOnInit() {
    this.validation();
    this.getUser();
  }

  getUser() {
    this.authService.getAllUser().subscribe(
      (_usr: User[]) => {
        this.users = _usr;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error);
      }
    );
  }
  editar(usr: User, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.user = usr;
    this.registerForm.patchValue(this.user["user"]);
    this.registerForm.get('role').setValue(this.user["role"]["name"]);
  }
  novo(template) {
    this.openModal(template);
  }
  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }
  validation() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
    }, {
      validator: this.comparePass
    });
  }

  comparePass(fb: FormGroup) {
    const confirmPassCtrl = fb.get('confirmPassword');
    if (confirmPassCtrl.errors == null || 'mismatch' in confirmPassCtrl.errors) {
      if (fb.get('password').value !== confirmPassCtrl.value) {
        confirmPassCtrl.setErrors({ mismatch: true });
      } else {
        confirmPassCtrl.setErrors(null);
      }
    }
  }
  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign({password: this.registerForm.get('password').value}, this.registerForm.value);
        this.authService.register(this.user).subscribe(
          () => {
            this.role.email = this.user.email;
            this.role.delete = 'false';
            this.role.role = this.user.role;
            this.updateUser();
            this.router.navigate(['user/login']);
            this.toastr.success('Cadastrado com sucesso');
          },
          error => {
            const erro = error.error;
            erro.array.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toastr.error('Cadastro Duplicado!');
                  break;
                default:
                  this.toastr.error(`Erro no cadastro! CODE: ${element.code}`);
                  break;
              }
            });
          }
        );
      /*if (this.modoSalvar === 'post') {
        
      } else {
        
      }*/
    }
  }

  updateUser() {
    delay(500);
    this.authService.putUserRole(this.role).subscribe(
      () => {
        console.log('OK');
      },
    );
  }

}
