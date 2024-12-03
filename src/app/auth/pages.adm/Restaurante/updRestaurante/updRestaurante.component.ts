import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogResComponent } from '../regRes-confirm-dialog/confirm-dialog-Res.component';

@Component({
  selector: 'app-updRestaurante',
  templateUrl: './updRestaurante.component.html',
  styleUrls: ['./updRestaurante.component.css']
})
export class UpdRestauranteComponent implements OnInit {
  updFormGroup!: FormGroup;
  restauranteId: string | null = null;
  restaurantes: any[] = [];
  isLinear = true;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.updFormGroup = this._formBuilder.group({
      imageUrl: [''],
      nombreRestaurante: ['', Validators.required],
      descripcion: ['', Validators.required],
      calificacion: [''],
      costo: [''],
      categoria: ['']
    });

    this.loadRestaurantes();
  }

  loadRestaurantes() {
    this.http.get<any[]>('http://localhost:3000/restaurantes').subscribe(response => {
      this.restaurantes = response;
    }, error => {
      console.error('Error al cargar los restaurantes:', error);
    });
  }

  onRestauranteSelected(name: string) {
    const selectedRestaurante = this.restaurantes.find(restaurante => restaurante.nombreRestaurante === name);

    if (selectedRestaurante) {
      this.restauranteId = selectedRestaurante.idRestaurante;
      this.updFormGroup.patchValue(selectedRestaurante);
    } else {
      console.error('Restaurante no encontrado');
    }
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogResComponent, {
      width: '300px',
      data: { message: '¿Estás seguro de que deseas guardar estos datos?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updRestaurante();
      }
    });
  }

  updRestaurante() {
    if (!this.restauranteId) {
      console.error('ID de restaurante no definido');
      return;
    }

    const formData = {
      imageUrl: this.updFormGroup.get('imageUrl')?.value,
      nombreRestaurante: this.updFormGroup.get('nombreRestaurante')?.value,
      descripcion: this.updFormGroup.get('descripcion')?.value,
      calificacion: this.updFormGroup.get('calificacion')?.value,
      costo: this.updFormGroup.get('costo')?.value,
      categoria: this.updFormGroup.get('categoria')?.value
    };

    this.http.patch(`http://localhost:3000/restaurantes/${this.restauranteId}`, formData)
      .subscribe(response => {
        console.log('Restaurante actualizado:', response);
        window.location.reload(); // Recargar la página después de eliminar
      }, error => {
        console.error('Error al actualizar el restaurante:', error);
      });
  }
}
