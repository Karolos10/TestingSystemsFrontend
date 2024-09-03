import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellidos: '',
    email: '',
    telefono: ''
  }

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {

  }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null ||
      this.user.password == '' || this.user.password == null ||
      this.user.nombre == '' || this.user.nombre == null ||
      this.user.apellidos == '' || this.user.apellidos == null ||
      this.user.email == '' || this.user.email == null ||
      this.user.telefono == '' || this.user.telefono == null) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe((data) => {
      console.log(data);
      alert('Usuario añadido correctamente');
    }, (error) => {
      console.log(error);
      alert('Ha ocurrido un error al añadir el usuario');
    }
    )
  }



}
