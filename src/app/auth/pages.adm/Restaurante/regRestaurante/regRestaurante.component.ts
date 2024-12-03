import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogResComponent } from '../regRes-confirm-dialog/confirm-dialog-Res.component';

@Component({
  selector: 'app-reg-restaurante',
  templateUrl: './regRestaurante.component.html',
  styleUrls: ['./regRestaurante.component.css']
})
export class RegRestauranteComponent implements OnInit {
  firstFormGroup!: FormGroup;
  imageMethod: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // Inicialización del formulario con validaciones
    this.firstFormGroup = this._formBuilder.group({
      nombreRestaurante: ['', Validators.required],
      descripcion: ['', Validators.required],
      calificacion: [''],
      costo: [''],
      categoria: ['', Validators.required],
      imageUrl: ['', Validators.required] // URL de la imagen también requerida
    });
  }

  // Método para abrir el diálogo de confirmación
  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogResComponent, {
      width: '300px',
      data: {} // Se puede pasar más datos si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveStep1(); // Si se confirma, se guardan los datos
      }
    });
  }

  // Método para guardar los datos del formulario
  saveStep1() {
    const formData = {
      nombreRestaurante: this.firstFormGroup.get('nombreRestaurante')?.value,
      descripcion: this.firstFormGroup.get('descripcion')?.value,
      calificacion: this.firstFormGroup.get('calificacion')?.value,
      costo: this.firstFormGroup.get('costo')?.value,
      categoria: this.firstFormGroup.get('categoria')?.value,
      imageUrl: this.firstFormGroup.get('imageUrl')?.value
    };

    // Llamada HTTP para enviar los datos al backend
    this.http.post('http://localhost:3000/Restaurantes', formData)
      .subscribe(response => {
        console.log('Restaurante guardado:', response);
        window.location.reload(); // Recargar la página tras guardar
      }, error => {
        console.error('Error al guardar el restaurante:', error);
      });
  }
}
