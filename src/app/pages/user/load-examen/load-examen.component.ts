import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenServiceService } from '../../../services/examen-service.service';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrl: './load-examen.component.css'
})
export class LoadExamenComponent implements OnInit {

  catId: any;
  examenes: any;
  constructor(private route: ActivatedRoute, private examenServices: ExamenServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        console.log("Cargando todos los examenes", this.catId);
        this.examenServices.examenesActivos().subscribe((data) => {
          this.examenes = data;
          console.log(this.examenes);
        }, (error) => {
          console.log(error);
        })
      } else {
        console.log("Cargando examenes de la categoria", this.catId);
        this.examenServices.obtenerExamenesActivosDeUnaCategoria(this.catId).subscribe((data) => {
          this.examenes = data;
          console.log(this.examenes);
        }, (error) => {
          console.log(error);
        })
      }
    })
  }
}
