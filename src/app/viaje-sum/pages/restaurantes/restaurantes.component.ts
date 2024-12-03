import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from '../../../auth/pages.adm/Restaurante/restaurante.interface';


@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
  restaurantes: Restaurante[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Restaurante[]>('http://localhost:3000/Restaurantes')
      .subscribe(data => {
        console.log('Restaurantes:', data);
        this.restaurantes = data;
      }, error => {
        console.error('Error al cargar los restaurantes:', error);
      });
  }
}
