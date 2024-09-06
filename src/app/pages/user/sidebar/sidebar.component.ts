import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  categorias: any;




  constructor(
    private categoriaServices: CategoriaService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {

    this.categoriaServices.listarCategorias().subscribe((data: any) => {
      this.categorias = data;
    }, (error: any) => {
      this.snack.open('Error al listar categorias', 'OK', { duration: 3000 });
      console.log(error);
    })
  }

}
