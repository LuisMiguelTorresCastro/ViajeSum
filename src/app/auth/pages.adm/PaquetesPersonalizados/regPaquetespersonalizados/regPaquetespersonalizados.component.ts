import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reg-paquetespersonalizados',
  templateUrl: './regPaquetespersonalizados.component.html',
  styleUrls: ['./regPaquetespersonalizados.component.css']
})
export class RegPaquetespersonalizadosComponent implements OnInit {
  firstFormGroup!: FormGroup;
  imageMethod: string = '';
  selectedFile: File | null = null;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nomPaqPer: ['', Validators.required],
      desPaqPer: [''],
      prePaqPer: [''],
      fecCre: [''],
      imageUrl: ['']
    });
  }

  onImageMethodChange(method: string) {
    this.imageMethod = method;
    if (method === 'url') {
      this.firstFormGroup.get('imageUrl')?.setValidators([Validators.required]);
    } else {
      this.firstFormGroup.get('imageUrl')?.clearValidators();
    }
    this.firstFormGroup.get('imageUrl')?.updateValueAndValidity();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveStep1() {
    const formData = new FormData();
    formData.append('nomPaqPer', this.firstFormGroup.get('nomPaqPer')?.value);
    formData.append('desPaqPer', this.firstFormGroup.get('desPaqPer')?.value);
    formData.append('prePaqPer', this.firstFormGroup.get('prePaqPer')?.value);
    formData.append('fecCre', this.firstFormGroup.get('fecCre')?.value);

    if (this.imageMethod === 'file' && this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    } else if (this.imageMethod === 'url') {
      formData.append('imageUrl', this.firstFormGroup.get('imageUrl')?.value);
    }

    this.http.post('http://localhost:3000/Paquetespersonalizados', formData)
      .subscribe(response => {
        console.log('Paquete personalizado guardado:', response);
      }, error => {
        console.error('Error:', error);
      });
  }
}
