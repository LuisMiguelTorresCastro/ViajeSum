import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogResComponent } from '../regRes-confirm-dialog/confirm-dialog-Res.component';

@Component({
  selector: 'app-delrestaurante',
  templateUrl: './delRestaurante.component.html',
  styleUrls: ['./delRestaurante.component.css']
})
export class DelRestauranteComponent implements OnInit {
  deleteFormGroup!: FormGroup;
  restaurantes: any[] = []; // Lista de restaurantes
  restauranteId: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.deleteFormGroup = this._formBuilder.group({
      idRestarurante: [{ value: '', disabled: true }],
      nombreRestaurante: ['', Validators.required] // Asegúrate de que el nombre sea consistente
    });
    

    this.loadRestaurantes(); // Cargar la lista de restaurantes
  }

  loadRestaurantes() {
    this.http.get<any[]>('http://localhost:3000/restaurantes').subscribe(response => {
      this.restaurantes = response;
    }, error => {
      console.error('Error al cargar los restaurantes:', error);
    });
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogResComponent, {
      width: '300px',
      data: { message: '¿Estás seguro de que deseas eliminar esta agencia?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRestaurante();
      }
    });
  }

  deleteRestaurante() {
    if (!this.deleteFormGroup.value.nombreRestaurante) {
      console.error('Nombre de restaurante no definido');
      return;
    }
    
    const restauranteToDelete = this.restaurantes.find(restaurante => restaurante.nombreRestaurante === this.deleteFormGroup.value.nombreRestaurante);
    
    if (!restauranteToDelete) {
      console.error('Restaurante no encontrado');
      return;
    }
    

    this.restauranteId = restauranteToDelete.idRestaurante; // Asignar el ID del restaurante a eliminar

    this.http.delete(`http://localhost:3000/restaurantes/${this.restauranteId}`)
      .subscribe(response => {
        window.location.reload(); // Recargar la página después de eliminar
      }, error => {
        console.error('Error al eliminar el restaurante:', error);
      });
  }
}
