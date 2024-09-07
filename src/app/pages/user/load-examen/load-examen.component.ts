import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenServiceService } from '../../../services/examen-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrl: './load-examen.component.css'
})
export class LoadExamenComponent implements OnInit {

  exameneId: any;

  catId: any;
  examenes: any;
  
  constructor(
    private route: ActivatedRoute,
    private examenServices: ExamenServiceService,
    private router: Router) { }

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

  empezarExamen() {
    Swal.fire({
      title: '¿Estás seguro de empezar el examen?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.exameneId);
        this.router.navigate(['/start/' + this.exameneId]);
      } else if (result.isDenied) {
        Swal.fire('No se ha iniciado el examen', '', 'info');
      }
    })
  }
}
