import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.html',
  styleUrls: ['./lista.css']
})
export class ListaComponent implements OnInit {
  agencias: any[] = [];
  experiencias: any[] = [];
  hoteles: any[] = [];
  restaurantes: any[] = [];
  errorMessage: string = '';

  async ngOnInit(): Promise<void> {
    try {
      this.agencias = await this.fetchData('http://localhost:3000/agencias');
      this.experiencias = await this.fetchData('http://localhost:3000/experiencias');
      this.hoteles = await this.fetchData('http://localhost:3000/hoteles');
      this.restaurantes = await this.fetchData('http://localhost:3000/restaurantes');
    } catch (error) {
      this.errorMessage = 'Error al cargar los datos';
      console.error('Error al cargar los datos:', error);
    }
  }

  private async fetchData(url: string): Promise<any[]> {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error en la solicitud: ' + response.statusText);
      return await response.json();
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return [];
    }
  }
}
