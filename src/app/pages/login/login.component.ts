import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServicesService } from '../../services/login-services.service';

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

  constructor(private snack: MatSnackBar, private loginService: LoginServicesService) { }

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
        /* this.loginService.setUser(user);
        this.snack.open('Bienvenido', 'Aceptar', { duration: 5000 }); */
      });
    }, (error) => {
      console.log(error);
      this.snack.open('Datos incorrectos', 'Aceptar', { duration: 5000 });
    })
  }


}
