import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogExpComponent } from '../regExp-confirm-dialog/confirm-dialog-Exp.component';

@Component({
  selector: 'app-updExperiencias',
  templateUrl: './updExperiencias.component.html',
  styleUrls: ['./updExperiencias.component.css']
})
export class UpdExperienciasComponent implements OnInit {
  updFormGroup!: FormGroup;
  expId: string | null = null;
  experiencias: any[] = [];
  isLinear = true;

  constructor(
    private _formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.updFormGroup = this._formBuilder.group({
      nombreExperiencias: [''],
      descripcion: [''],
      categoria: [''],
      costo: [''],
      fechas: [''],
      duracion: [''],
      direccion: [''],
      correo: [''],
      telefono: [''],
      tipo: [''],
      imageUrl: ['']
    });

    this.loadExperiencias();
  }

  loadExperiencias() {
    this.http.get<any[]>('http://localhost:3000/Experiencias').subscribe(response => {
      this.experiencias = response;
    }, error => {
      console.error('Error al cargar las Experiencias:', error);
    });
  }

  onExperienciaSelected(name: string) {
    const selectedExperiencia = this.experiencias.find(exp => exp.nombreExperiencias === name);
  
    if (selectedExperiencia) {
      this.expId = selectedExperiencia.idExperiencias;
      this.updFormGroup.patchValue(selectedExperiencia);
    } else {
      console.error('Experiencia no encontrada o ID de Experiencia no definido');
    }
  }
  
  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogExpComponent, {
      width: '300px',
      data: { message: '¿Estás seguro de que deseas guardar estos datos?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updExperiencia();
      }
    });
  }

  updExperiencia() {
    if (!this.expId) {
      console.error('ID de Experiencia no definido');
      return;
    }

    const formData = {
      nombreExperiencias: this.updFormGroup.get('nombreExperiencias')?.value,
      descripcion: this.updFormGroup.get('descripcion')?.value,
      categoria: this.updFormGroup.get('categoria')?.value,
      costo: this.updFormGroup.get('costo')?.value,
      fechas: this.updFormGroup.get('fechas')?.value,
      duracion: this.updFormGroup.get('duracion')?.value,
      direccion: this.updFormGroup.get('direccion')?.value,
      correo: this.updFormGroup.get('correo')?.value,
      telefono: this.updFormGroup.get('telefono')?.value,
      tipo: this.updFormGroup.get('tipo')?.value,
      imageUrl: this.updFormGroup.get('imageUrl')?.value
    };

    this.http.patch(`http://localhost:3000/Experiencias/${this.expId}`, formData)
      .subscribe(response => {
        console.log('Experiencia actualizada:', response);
        window.location.reload(); // Recargar la página después de eliminar
      }, error => {
        console.error('Error al actualizar la Experiencia:', error);
      });
  }
}
