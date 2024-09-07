import { Component, OnInit } from '@angular/core';
import { ExamenServiceService } from '../../services/examen-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrl: './view-examenes.component.css',
})
export class ViewExamenesComponent implements OnInit {
  examenes: any = [];

  constructor(private examenServices: ExamenServiceService) {}

  ngOnInit(): void {
    this.examenServices.listarExamenes().subscribe(
      (data: any) => {
        this.examenes = data;
        console.log(this.examenes);
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', 'Error al cargar los examenes', 'error');
      }
    );
  }

  eliminarExamen(exameneId: any) {
    Swal.fire({
      title: 'Eliminar el examen',
      text: '¿Estás seguro de eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenServices.eliminarExamen(exameneId).subscribe(
          (data: any) => {
            this.examenes = this.examenes.filter(
              (examen: any) => examen.exameneId != exameneId
            );
            Swal.fire(
              'Examen eliminado',
              'El examen ha sido eliminado correctamente',
              'success'
            );
          },
          (error) => {
            console.error(error);
            Swal.fire('Error', 'Error al eliminar el examen', 'error');
          }
        );
      }
    });
  }
}
