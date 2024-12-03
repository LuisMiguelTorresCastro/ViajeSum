import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencias } from '../../../auth/pages.adm/Experiencias/experiencias.interface';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {
  experiencias: Experiencias[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Experiencias[]>('http://localhost:3000/Experiencias')
      .subscribe(data => {
        console.log('Experiencias:', data);
        this.experiencias = data;
      }, error => {
        console.error('Error:', error);
      });
  }
  viewExperienciaDetails(experienciaId?: string) {
    if (experienciaId) {
      this.router.navigate([`/detallesexp/${experienciaId}/experiencia`]);
    } else {
      console.error('Experiencia ID is undefined');
    }
  }
}
