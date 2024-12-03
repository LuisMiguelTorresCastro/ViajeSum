import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogPapComponent } from '../../PaquetesPersonalizados/regPaP-confirm-dialog/confirm-dialog-Pap.component';

@Component({
  selector: 'app-reg-Paquete',
  templateUrl: './regPaquete.component.html',
  styleUrls: ['./regPaquete.component.css']
})
export class RegPaqueteComponent implements OnInit {
  firstFormGroup!: FormGroup;
  imageMethod: string = 'url'; // Valor inicial para usar URL de imagen
  selectedFile: File | null = null;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nombrePaquete: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: [''],
      costo: [''],
      fechas: [''],
      fechaInicio: [''],
      fechaFin: [''],
      duracion: [''],
      maxParticipantes: [''],
      estado: ['activo'],
      descuento: [''],
      popularidad: [''],
      valoracion: [''],
      tipo: [''],
      imageUrl: [''], // Campo para la URL de imagen
      imageFile: [''], // Campo para el archivo de imagen
    });
  }

  // Método para cambiar el método de imagen entre URL y archivo
  selectImageMethod(method: string) {
    this.imageMethod = method;

    // Limpiar los valores de imagen cuando cambias el método
    if (method === 'url') {
      this.firstFormGroup.patchValue({ imageFile: '' }); // Limpiar archivo
      this.selectedFile = null; // Limpiar selección de archivo
    } else {
      this.firstFormGroup.patchValue({ imageUrl: '' }); // Limpiar URL
    }
  }

  // Método para manejar el archivo seleccionado
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.firstFormGroup.patchValue({ imageFile: this.selectedFile.name });
    } else {
      console.error('No file selected');
    }
  }
  
  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogPapComponent, {
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
    const formData = new FormData();
    
    // Agregar campos del formulario al FormData
    Object.keys(this.firstFormGroup.controls).forEach(key => {
      formData.append(key, this.firstFormGroup.get(key)?.value);
    });

    // Determinar si usar la URL o el archivo de imagen
    if (this.imageMethod === 'url') {
      formData.append('imageUrl', this.firstFormGroup.get('imageUrl')?.value);
    } else if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }

    // Enviar datos al servidor
    this.http.post('http://localhost:3000/Paquetes', formData)
      .subscribe(response => {
        console.log('Success:', response); // Log de éxito
        window.location.reload(); // Recargar la página después de guardar
      }, error => {
        console.error('Error:', error); // Log de error
      });
  }
}
