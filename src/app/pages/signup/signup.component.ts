import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
  };

  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (
      this.user.username == '' ||
      this.user.username == null ||
      this.user.password == '' ||
      this.user.password == null ||
      this.user.nombre == '' ||
      this.user.nombre == null ||
      this.user.apellidos == '' ||
      this.user.apellidos == null ||
      this.user.email == '' ||
      this.user.email == null ||
      this.user.telefono == '' ||
      this.user.telefono == null
    ) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son requeridos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log('Usuario añadido: ', data);
        Swal.fire({
          title: 'Usuario registrado',
          text: 'El usuario ha sido registrado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      (error) => {
        console.log('Error al añadir usuario: ', error);

        Swal.fire({
          title: 'Error',
          text: 'El usuario ha sido registrado con éxito',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }
}
