import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServicesService } from '../../../services/login-services.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  categorias: any;

  constructor(
    private categoriaServices: CategoriaService,
    private snack: MatSnackBar,
    public login: LoginServicesService
  ) {}

  ngOnInit(): void {
    this.categoriaServices.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
      },
      (error: any) => {
        this.snack.open('Error al listar categorias', 'OK', { duration: 3000 });
        console.log(error);
      }
    );
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}
