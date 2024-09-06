import { Component, OnInit } from '@angular/core';
import { PreguntaService } from '../../services/pregunta.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pregunta',
  templateUrl: './actualizar-pregunta.component.html',
  styleUrl: './actualizar-pregunta.component.css'
})
export class ActualizarPreguntaComponent implements OnInit {

  preguntaId: any;
  pregunta: any;
  examen: any;
  //exameneId: any;
  //titulo: any;


  constructor(
    private preguntaService: PreguntaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.preguntaId = this.route.snapshot.params['preguntaId'];
    this.preguntaService.obtenerPregunta(this.preguntaId).subscribe((data: {}) => {
      this.pregunta = data;
      console.log(this.pregunta);
    }, (error) => {
      console.log(error);
    })
  }

  public actualizarDatosDeLaPregunta() {
    this.preguntaService.actualizarPregunta(this.pregunta).subscribe((data) => {
      Swal.fire({
        title: 'Pregunta Actualizada',
        text: 'La pregunta se ha actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then((e) => {
        this.router.navigate(['/admin/ver-preguntas/' + this.pregunta.examen.exameneId + '/' + this.pregunta.examen.titulo]);
      });
    }, (errr) => {
      console.log(errr);
      Swal.fire({
        title: 'Error',
        text: 'Hay un error al actualizar la pregunta',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    })
  }

}
