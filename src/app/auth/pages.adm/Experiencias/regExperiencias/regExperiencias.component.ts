import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogExpComponent } from '../regExp-confirm-dialog/confirm-dialog-Exp.component';


@Component({
  selector: 'app-reg-experiencias',
  templateUrl: './regExperiencias.component.html',
  styleUrls: ['./regExperiencias.component.css']
})
export class RegExperienciasComponent implements OnInit {
  firstFormGroup!: FormGroup;
  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder, 
    private http: HttpClient,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nombreExperiencias: ['', Validators.required],
      descripcion: [''],
      categoria: [''],
      costo: [null, Validators.required],
      fechas: [null, Validators.required],
      duracion: [''],
      direccion: [''],
      correo: [''],
      telefono: [null, Validators.required],
      tipo: [''],
      imageUrl: [''] 
    });
  }
  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogExpComponent, {
      width: '300px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveStep1();
      }
    });
  }

  saveStep1() {
    const formData = {
      nombreExperiencias: this.firstFormGroup.get('nombreExperiencias')?.value || '',
      descripcion: this.firstFormGroup.get('descripcion')?.value || '',
      categoria: this.firstFormGroup.get('categoria')?.value || '',
      costo: this.firstFormGroup.get('costo')?.value || null,
      fechas: this.firstFormGroup.get('fechas')?.value 
        ? new Date(this.firstFormGroup.get('fechas')?.value).toISOString().split('T')[0]
        : '',
      duracion: this.firstFormGroup.get('duracion')?.value || '',
      direccion: this.firstFormGroup.get('direccion')?.value || '',
      correo: this.firstFormGroup.get('correo')?.value || '',
      telefono: this.firstFormGroup.get('telefono')?.value || null,
      tipo: this.firstFormGroup.get('tipo')?.value || '',
      imageUrl: this.firstFormGroup.get('imageUrl')?.value || '',
    };
  
    this.http.post('http://localhost:3000/Experiencias', formData)
      .subscribe(response => {
        console.log('Experiencia guardada:', response);
        window.location.reload(); // Recargar la página después de eliminar
      }, error => {
        console.error('Error:', error);
      });
  }
} 
