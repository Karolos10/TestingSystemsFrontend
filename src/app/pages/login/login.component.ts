import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServicesService } from '../../services/login-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  }

  constructor(private snack: MatSnackBar, private loginService: LoginServicesService, private router: Router) { }

  ngOnInit() {
  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.password.trim() == null
      || this.loginData.password.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open('Datos incompletos', 'Aceptar', { duration: 5000 });
    }

    this.loginService.login(this.loginData).subscribe((data: any) => {
      console.log(data);

      this.loginService.saveToken(data.token);
      this.loginService.getCurrentUser().subscribe((user: any) => {
        console.log(user);
        this.loginService.setUser(user);

        const permissions = this.loginService.getUserRole();
        console.log(permissions);
        if (permissions?.includes('ADMIN')) {
          //dashboard admin
          this.router.navigate(['/admin']);
          this.loginService.loginStatusSubject.next(true);
        }
        else if (permissions?.includes('NORMAL')) {
          //user dashboard
          this.router.navigate(['/user-dashboard']);
          this.loginService.loginStatusSubject.next(true);
        }
        else {
          this.loginService.logout();
        }
        /* //this.snack.open('Bienvenido', 'Aceptar', { duration: 5000 });
        if (this.loginService.getUserRole() == 'ADMIN') {
          window.location.href = '/admin';
        } else if (this.loginService.getUserRole() == 'NORMAL') {
          window.location.href = '/user-dashboard';
        } else {
          this.loginService.logout();
        } */
      });
    }, (error) => {
      console.log(error);
      this.snack.open('Datos incorrectos', 'Aceptar', { duration: 5000 });
    })
  }


}
