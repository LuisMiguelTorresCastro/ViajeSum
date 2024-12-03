import { Component, Input, OnInit } from '@angular/core';
import { Experiencias } from '../experiencias.interface';

@Component({
  selector: 'app-reg-exp-card',
  templateUrl: './regExp-card.component.html',
  styleUrls: ['./regExp-card.component.css']
})
export class RegExperienciasCardComponent implements OnInit {
  @Input() experiencias!: Experiencias;
  imageUrl: string | null = null;

  ngOnInit() {
    if (this.experiencias) {
      this.imageUrl = this.experiencias.imageUrl || null;
    } else {
      console.warn('Experiencias no está definido');
    }
    console.log('Experiencias:', this.experiencias);
    console.log('Image URL:', this.imageUrl);
  }
}
