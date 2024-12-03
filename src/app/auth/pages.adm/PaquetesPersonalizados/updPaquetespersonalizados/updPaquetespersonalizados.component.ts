import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upd-paquetespersonalizados',
  templateUrl: './updPaquetespersonalizados.component.html',
  styleUrls: ['./updPaquetespersonalizados.component.css']
})
export class UpdPaquetespersonalizadosComponent implements OnInit {
  updFormGroup!: FormGroup;
  imageMethod: string = '';  // Método de imagen: 'file' o 'url'
  selectedFile: File | null = null;
  PaquetespersonalizadosId: string | null = null;
  PaquetePersonalizados: any[] = []; // Lista de Paquetes Personalizados
  isLinear = true;  // Establece que el paso es lineal

  constructor(
    private _formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.updFormGroup = this._formBuilder.group({
      nomPaqPer: ['', Validators.required],
      desPaqPer: ['', Validators.required],
      prePaqPer: [''],
      fecCre: [''],
      imageUrl: [''],
      imageFile: [null]
    });

    this.loadPaquetePersonalizados();
  }

  loadPaquetePersonalizados() {
    this.http.get<any[]>('http://localhost:3000/Paquetespersonalizados').subscribe(response => {
      this.PaquetePersonalizados = response;
    }, error => {
      console.error('Error al cargar los paquetes personalizados:', error);
    });
  }

  onPaquetePersonalizadoselected(name: string) {
    const selectedPaquetespersonalizados = this.PaquetePersonalizados.find(p => p.nomPaqPer === name);

    if (selectedPaquetespersonalizados) {
      this.PaquetespersonalizadosId = selectedPaquetespersonalizados.idPaqPer;
      this.updFormGroup.patchValue(selectedPaquetespersonalizados);
      this.imageMethod = selectedPaquetespersonalizados.imageUrl ? 'url' : 'file';
    } else {
      console.error('Paquete personalizado no encontrado');
    }
  }

  onImageMethodChange(method: string) {
    this.imageMethod = method;
    if (method === 'file') {
      this.updFormGroup.get('imageUrl')?.setValue('');
    } else if (method === 'url') {
      this.updFormGroup.get('imageFile')?.setValue(null);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updPaquetespersonalizados() {
    if (!this.PaquetespersonalizadosId) {
      console.error('ID de paquete personalizado no definido');
      return;
    }

    const formData = new FormData();
    formData.append('nomPaqPer', this.updFormGroup.get('nomPaqPer')?.value);
    formData.append('desPaqPer', this.updFormGroup.get('desPaqPer')?.value);
    formData.append('prePaqPer', this.updFormGroup.get('prePaqPer')?.value);
    formData.append('fecCre', this.updFormGroup.get('fecCre')?.value);

    if (this.imageMethod === 'url') {
      formData.append('imageUrl', this.updFormGroup.get('imageUrl')?.value || '');
    }

    if (this.imageMethod === 'file' && this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    this.http.patch(`http://localhost:3000/Paquetespersonalizados/${this.PaquetespersonalizadosId}`, formData)
      .subscribe(response => {
        console.log('Paquete personalizado actualizado:', response);
        this.router.navigate(['/Paquetespersonalizados']);
      }, error => {
        console.error('Error al actualizar el paquete personalizado:', error);
      });
  }
}
