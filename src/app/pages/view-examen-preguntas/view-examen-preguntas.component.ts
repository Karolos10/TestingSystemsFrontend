import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from '../../services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrl: './view-examen-preguntas.component.css',
})
export class ViewExamenPreguntasComponent implements OnInit {
  exameneId: any;
  titulo: any;
  preguntas: any = [];

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService
  ) {}

  ngOnInit(): void {
    this.exameneId = this.route.snapshot.params['exameneId'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.preguntaService.listarPreguntasExamen(this.exameneId).subscribe(
      (res: any) => {
        console.log(res);
        this.preguntas = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarPregunta(preguntaId: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar esta pregunta!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.preguntaService.eliminarPregunta(preguntaId).subscribe(
          (data: any) => {
            console.log(data);
            Swal.fire({
              title: 'Pregunta Eliminada',
              text: 'La pregunta se ha eliminado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              window.location.href = `admin/ver-preguntas/${this.exameneId}/${this.titulo}`;
            });
          },
          (error) => {
            console.log(error);
            Swal.fire({
              title: 'Error',
              text: 'Hay un error al eliminar la pregunta',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        );
      }
    });
  }
}
