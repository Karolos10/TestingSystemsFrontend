import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import Swal from 'sweetalert2';
import { ExamenServiceService } from '../../services/examen-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-examene',
  templateUrl: './add-examene.component.html',
  styleUrl: './add-examene.component.css'
})
export class AddExameneComponent implements OnInit {

  categorias: any = []

  examenData = {
    titulo: '',
    descripcion: '',
    puntosMaximos: '',
    numeroPreguntas: '',
    activo: true,
    categoria: {
      categoriaId: '',
    }
  }

  constructor(
    private categoriaService: CategoriaService,
    private examenService: ExamenServiceService,
    private router: Router) { }

  ngOnInit(): void {

    this.categoriaService.listarCategorias().subscribe((data: any) => {
      this.categorias = data;
      console.log(this.categorias);
      /* Swal.fire({
        title: 'Examen Registrado',
        text: 'El examen se ha registrado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }); */
    }, (error) => {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Hay un error cargar los datos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      Swal.fire('Error', 'Error al cargar las categorias', 'error');
    })

  }

  guardarCuestionario() {
    console.log(this.examenData);
    if (this.examenData.titulo.trim() == '' || this.examenData.titulo == null) {
      Swal.fire('Error', 'El titulo es requerido', 'error');
      return;
    }

    this.examenService.agregarExamen(this.examenData).subscribe((data: any) => {
      console.log(data);
      Swal.fire({
        title: 'Examen Registrado',
        text: 'El examen se ha registrado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.examenData = {
        titulo: '',
        descripcion: '',
        puntosMaximos: '',
        numeroPreguntas: '',
        activo: true,
        categoria: {
          categoriaId: '',
        }
      }
      this.router.navigate(['/admin/examenes']);
    }, (error) => {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Hay un error al registrar los examenes',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    })
  }

}
