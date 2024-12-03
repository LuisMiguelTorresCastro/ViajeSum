import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paquete } from '../../../auth/pages.adm/Paquetes/Paquete.interface';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {
  paquetes: Paquete[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Paquete[]>('http://localhost:3000/Paquetes')
      .subscribe(data => {
        console.log('Paquetes:', data);
        this.paquetes = data;

      }, error => {
        console.error('Error al cargar los paquetes:', error);
      });
  }

  viewPaqueteDetails(paqueteId?: string) {
    if (paqueteId) {
      this.router.navigate([`/detallespaq/${paqueteId}/paquete`]);
    } else {
      console.error('Paquete ID is undefined');
    }
  }
}
