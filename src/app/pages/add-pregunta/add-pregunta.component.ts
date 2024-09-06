import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from '../../services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrl: './add-pregunta.component.css'
})
export class AddPreguntaComponent implements OnInit {

  exameneId: any;
  titulo: any;
  pregunta: any = {
    examen: {},
    contenidoPregunta: '',
    opcion1: '',
    opcion2: '',
    opcion3: '',
    opcion4: '',
    respuesta: ''
  };

  constructor(private route: ActivatedRoute, private preguntaService: PreguntaService) { }

  ngOnInit(): void {
    this.exameneId = this.route.snapshot.params['exameneId'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.pregunta.examen['exameneId'] = this.exameneId;
  }

  formSubmit() {
    if (this.pregunta.contenidoPregunta.trim() == '' || this.pregunta.contenidoPregunta == null ||
      this.pregunta.opcion1.trim() == '' || this.pregunta.opcion1 == null ||
      this.pregunta.opcion2.trim() == '' || this.pregunta.opcion2 == null ||
      this.pregunta.opcion3.trim() == '' || this.pregunta.opcion3 == null ||
      this.pregunta.opcion4.trim() == '' || this.pregunta.opcion4 == null ||
      this.pregunta.respuesta.trim() == '' || this.pregunta.respuesta == null) {
      alert('Todos los campos son requeridos');
      return;
    }

    this.preguntaService.guardarPregunta(this.pregunta).subscribe((data: any) => {
      console.log(data);
      Swal.fire({
        title: 'Pregunta Registrada',
        text: 'La pregunta se ha registrado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        window.location.href = `admin/add-pregunta/${this.exameneId}/${this.titulo}`;
      })
    }, (error) => {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Hay un error al cargar la pregunta',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    });
  }
}
