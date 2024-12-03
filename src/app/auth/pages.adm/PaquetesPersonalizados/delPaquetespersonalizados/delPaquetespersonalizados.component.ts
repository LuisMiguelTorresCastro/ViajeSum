import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delPaquetespersonalizados',
  templateUrl: './delPaquetespersonalizados.component.html',
  styleUrls: ['./delPaquetespersonalizados.component.css']
})
export class DelPaquetespersonalizadosComponent implements OnInit {
  deleteFormGroup!: FormGroup;
  paquetesPersonalizados: any[] = []; // Lista de paquetes personalizados
  paquetePersonalizadoId: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.deleteFormGroup = this._formBuilder.group({
      nomPaqPer: ['', Validators.required] // Campo actualizado
    });

    this.loadPaquetesPersonalizados(); // Cargar la lista de paquetes personalizados
  }

  loadPaquetesPersonalizados() {
    this.http.get<any[]>('http://localhost:3000/paquetespersonalizados').subscribe(response => {
      this.paquetesPersonalizados = response;
    }, error => {
      console.error('Error al cargar los paquetes personalizados:', error);
    });
  }

  deletePaquetePersonalizado() {
    const nomPaqPer = this.deleteFormGroup.value.nomPaqPer;
    if (!nomPaqPer) {
      console.error('Nombre del paquete personalizado no definido');
      return;
    }

    const paquetePersonalizadoToDelete = this.paquetesPersonalizados.find(paquete => paquete.nomPaqPer === nomPaqPer);

    if (!paquetePersonalizadoToDelete) {
      console.error('Paquete personalizado no encontrado');
      return;
    }

    this.paquetePersonalizadoId = paquetePersonalizadoToDelete.idPaqPer; // Asignar el ID del paquete personalizado a eliminar

    this.http.delete(`http://localhost:3000/paquetespersonalizados/${this.paquetePersonalizadoId}`)
      .subscribe(response => {
        console.log('Paquete personalizado eliminado:', response);
        this.router.navigate(['/paquetespersonalizados']);
      }, error => {
        console.error('Error al eliminar el paquete personalizado:', error);
      });
  }
}
