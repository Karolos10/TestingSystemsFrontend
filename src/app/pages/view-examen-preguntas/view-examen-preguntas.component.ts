import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrl: './view-examen-preguntas.component.css'
})
export class ViewExamenPreguntasComponent implements OnInit {

  exameneId: any;
  titulo: any;
  preguntas: any = [];

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService) { }

  ngOnInit(): void {
    this.exameneId = this.route.snapshot.params['exameneId'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.preguntaService.listarPreguntasExamen(this.exameneId).subscribe((res: any) => {
      console.log(res);
      this.preguntas = res;
    }, (error) => {
      console.log(error);
    });
  }

}
