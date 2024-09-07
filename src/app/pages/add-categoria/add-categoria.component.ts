import { Component } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../model/categoria';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.css',
})
export class AddCategoriaComponent {
  categoria: Categoria = {
    tituloCategoria: '',
    descripcionCategoria: '',
  };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit(): void {
    if (
      this.categoria.tituloCategoria.trim() == '' ||
      this.categoria.tituloCategoria == null
    ) {
      Swal.fire({
        title: 'Error',
        text: 'El titulo es requerido',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    this.categoriaService.guardarCategoria(this.categoria).subscribe(
      (data: any) => {
        this.categoria.tituloCategoria = '';
        this.categoria.descripcionCategoria = '';
        console.log('Categoria guardada: ', data);
        Swal.fire({
          title: 'Categoria Registrada',
          text: 'La categoria se ha registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

        this.router.navigate(['/admin/categorias']);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Hay un error al registrar las categorias',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }
}
