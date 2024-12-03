import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Paquete } from '../Paquete.interface';

@Component({
  selector: 'app-updPaquete',
  templateUrl: './updPaquete.component.html',
  styleUrls: ['./updPaquete.component.css']
})
export class UpdPaqueteComponent implements OnInit {
  updFormGroup!: FormGroup;
  paqueteId: string | null = null;
  paquetes: Paquete[] = [];
  isLinear: unknown;
  imageMethod: 'url' | 'file' = 'url'; // Método de imagen por defecto

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.updFormGroup = this._formBuilder.group({
      nombrePaquete: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: [''],
      costo: ['', [Validators.required, Validators.min(0)]],
      fechas: [''],
      tipo: [''],
      imageUrl: ['', Validators.pattern('https?://.+')],
      imageFile: [null],
      duracion: ['', Validators.min(0)],
      maxParticipantes: ['', [Validators.min(1), Validators.required]],
      popularidad: ['', [Validators.min(0), Validators.max(5)]],
      valoracion: ['', [Validators.min(0), Validators.max(5)]],
    });

    this.loadPaquetes();
  }

  loadPaquetes() {
    this.http.get<Paquete[]>('http://localhost:3000/Paquetes').subscribe(response => {
      this.paquetes = response;
      console.log('Paquetes cargados:', this.paquetes);
    }, error => {
      console.error('Error al cargar los Paquetes:', error);
    });
  }

  onPaqueteSelected(nombre: string) {
    const selectedPaquete = this.paquetes.find(paquete => paquete.nombrePaquete === nombre);

    if (selectedPaquete) {
      this.paqueteId = selectedPaquete.idPaquete || null;
      this.updFormGroup.patchValue({
        nombrePaquete: selectedPaquete.nombrePaquete,
        descripcion: selectedPaquete.descripcion,
        categoria: selectedPaquete.categoria,
        costo: selectedPaquete.costo,
        fechas: this.formatDateForInput(selectedPaquete.fechas),
        tipo: selectedPaquete.tipo,
        imageUrl: selectedPaquete.imageUrl || '',
        duracion: selectedPaquete.duracion,
        maxParticipantes: selectedPaquete.maxParticipantes,
        popularidad: selectedPaquete.popularidad,
        valoracion: selectedPaquete.valoracion
      });
    } else {
      console.error('Paquete no encontrado');
    }
  }

  formatDateForInput(dateString: string | undefined): string | null {
    if (!dateString) return null;

    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.updFormGroup.patchValue({ imageFile: file });
    }
  }

  selectImageMethod(method: 'url' | 'file') {
    this.imageMethod = method;
    // Resetea el campo imageFile si cambia a URL
    if (method === 'url') {
      this.updFormGroup.patchValue({ imageFile: null });
    }
  }

  updPaquete() {
    if (!this.paqueteId) {
      console.error('ID de Paquete no definido');
      return;
    }
  
    const formData = new FormData();
    // Agregar campos al formData
    formData.append('nombrePaquete', this.updFormGroup.get('nombrePaquete')?.value);
    formData.append('descripcion', this.updFormGroup.get('descripcion')?.value);
    formData.append('categoria', this.updFormGroup.get('categoria')?.value);
    formData.append('costo', this.updFormGroup.get('costo')?.value);
    formData.append('fechas', this.updFormGroup.get('fechas')?.value);
    formData.append('tipo', this.updFormGroup.get('tipo')?.value);
    formData.append('imageUrl', this.updFormGroup.get('imageUrl')?.value || '');
    formData.append('imageFile', this.updFormGroup.get('imageFile')?.value); // Añadir el archivo
    formData.append('duracion', this.updFormGroup.get('duracion')?.value || 0);
    formData.append('maxParticipantes', this.updFormGroup.get('maxParticipantes')?.value || 0);
    formData.append('popularidad', this.updFormGroup.get('popularidad')?.value || 0);
    formData.append('valoracion', this.updFormGroup.get('valoracion')?.value || 0);
  
    console.log('Enviando datos:', formData); // Depuración
    
    this.http.patch(`http://localhost:3000/Paquetes/${this.paqueteId}`, formData)
      .subscribe(response => {
        console.log('Paquete actualizado:', response);
        window.location.reload(); // Recargar la página después de actualizar
      }, error => {
        console.error('Error al actualizar el Paquete:', error);
      });
  }
  
}
