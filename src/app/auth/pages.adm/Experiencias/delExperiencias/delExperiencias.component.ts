import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delExperiencias',
  templateUrl: './delExperiencias.component.html',
  styleUrls: ['./delExperiencias.component.css']
})
export class DelExperienciasComponent implements OnInit {
  deleteFormGroup!: FormGroup;
  experiencias: any[] = []; // Lista de Experiencias
  experienciaId: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.deleteFormGroup = this._formBuilder.group({
      nomExperiencias: ['', Validators.required]
    });

    this.loadExperiencias(); // Cargar la lista de Experiencias
  }

  loadExperiencias() {
    this.http.get<any[]>('http://localhost:3000/Experiencias').subscribe(response => {
      this.experiencias = response;
    }, error => {
      console.error('Error al cargar las Experiencias:', error);
    });
  }

  deleteExperiencia() {
    const nombreExperiencia = this.deleteFormGroup.get('nomExperiencias')?.value;

    if (!nombreExperiencia) {
      console.error('Nombre de Experiencia no definido');
      return;
    }

    const experienciaToDelete = this.experiencias.find(exp => exp.nombreExperiencias === nombreExperiencia);

    if (!experienciaToDelete) {
      console.error('Experiencia no encontrada');
      return;
    }

    this.experienciaId = experienciaToDelete.idExperiencias; // Asignar el ID de la Experiencia a eliminar

    this.http.delete(`http://localhost:3000/Experiencias/${this.experienciaId}`)
      .subscribe(response => {
        console.log('Experiencia eliminada:', response);
        window.location.reload(); // Recargar la página después de eliminar
      }, error => {
        console.error('Error al eliminar la Experiencia:', error);
      });
  }
}
