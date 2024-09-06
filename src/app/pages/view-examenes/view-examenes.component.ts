import { Component, OnInit } from '@angular/core';
import { ExamenServiceService } from '../../services/examen-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrl: './view-examenes.component.css'
})
export class ViewExamenesComponent implements OnInit {

  examenes: any =[
    
  ]

  constructor(private examenServices: ExamenServiceService) { }

  ngOnInit(): void {

    this.examenServices.listarExamenes().subscribe((data: any) => {
      this.examenes = data;
      console.log(this.examenes);
    }, (error) => { 
      console.error(error);
      Swal.fire('Error', 'Error al cargar los examenes', 'error');
    })
  }

}
