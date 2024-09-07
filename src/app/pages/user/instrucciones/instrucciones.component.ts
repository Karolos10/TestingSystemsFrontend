import { Component, OnInit } from '@angular/core';
import { ExamenServiceService } from '../../../services/examen-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrl: './instrucciones.component.css'
})
export class InstruccionesComponent implements OnInit {

  exameneId: any;
  examenes: any = new Object();


  constructor(
    private examenService: ExamenServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.exameneId = this.route.snapshot.params['exameneId'];
    //console.log('Examene ID:', this.exameneId);
    this.examenService.obtenerExamen(this.exameneId).subscribe((data: any) => {
      console.log(data);
      this.examenes = data;
    }, (error) => {
      console.log(error);
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
