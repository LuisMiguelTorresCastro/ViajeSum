import { Component, Input, OnInit } from '@angular/core';
import { Restaurante } from '../restaurante.interface';

@Component({
  selector: 'restaurante-res-card',
  templateUrl: './regRes-card.component.html',
  styleUrls: ['./regRes-card.component.css']
})
export class RegRestauranteCardComponent implements OnInit {
  @Input() restaurante!: Restaurante;
  imageUrl: string | null = null;

  ngOnInit() {
    if (this.restaurante.imageUrl) {
      this.imageUrl = this.restaurante.imageUrl;
    }
    console.log('Restaurante:', this.restaurante);
  }
}
