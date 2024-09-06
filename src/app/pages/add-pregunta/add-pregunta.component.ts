import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.exameneId = this.route.snapshot.params['exameneId'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.pregunta.examen['exameneId'] = this.exameneId;
  }

}
