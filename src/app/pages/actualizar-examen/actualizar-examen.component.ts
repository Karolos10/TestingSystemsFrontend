import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenServiceService } from '../../services/examen-service.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../model/categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrl: './actualizar-examen.component.css',
})
export class ActualizarExamenComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenServiceService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  exameneId = 0;
  examen: any;
  categorias: any;

  ngOnInit(): void {
    this.exameneId = this.route.snapshot.params['exameneId'];
    this.examenService.obtenerExamen(this.exameneId).subscribe(
      (data) => {
        this.examen = data;
        console.log(this.examen);
      },
      (error) => {
        console.log(error);
      }
    );

    this.categoriaService.listarCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        alert('Ocurrio un error al listar las categorias');
      }
    );
  }

  public actualizarDatos() {
    this.examenService.actualizarExamen(this.examen).subscribe(
      (data) => {
        Swal.fire({
          title: 'Examen Actualizado',
          text: 'El examen se ha actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then((e) => {
          this.router.navigate(['/admin/examenes']);
        });
      },
      (errr) => {
        console.log(errr);
        Swal.fire({
          title: 'Error',
          text: 'Hay un error al actualizar el examen',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }
}
