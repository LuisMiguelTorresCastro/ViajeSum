import { Component, Input, OnInit } from '@angular/core';
import { PaquetePersonalizado } from '../Paquetespersonalizados.interface';

@Component({
  selector: 'app-paquete-personalizado-card',
  templateUrl: './regPaP-card.component.html',
  styleUrls: ['./regPaP-card.component.css']
})
export class RegPaquetePersonalizadoCardComponent implements OnInit {
  @Input() paquetePersonalizado!: PaquetePersonalizado;
  imageUrl: string | ArrayBuffer | null = null;

  ngOnInit() {
    if (this.paquetePersonalizado.imageUrl) {
      this.imageUrl = this.paquetePersonalizado.imageUrl;
    } else if (this.paquetePersonalizado.imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.paquetePersonalizado.imageFile);
      reader.onloadend = () => {
        this.imageUrl = reader.result;
      };
    }
    console.log('PaquetePersonalizado:', this.paquetePersonalizado);
  }
}
