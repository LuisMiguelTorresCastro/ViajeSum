import { Component, Input, OnInit } from '@angular/core';
import { Paquete } from '../Paquete.interface';

@Component({
  selector: 'paquete-paq-card', 
  templateUrl: './regPaq-card.component.html', 
  styleUrls: ['./regPaq-card.component.css'] 
})
export class RegPaqueteCardComponent implements OnInit {
  @Input() paquete!: Paquete; 
  imageUrl: string | ArrayBuffer | null = null;

  ngOnInit() {
    console.log('Paquete:', this.paquete);
    this.imageUrl = this.paquete.imageUrl || null;
  }
}
