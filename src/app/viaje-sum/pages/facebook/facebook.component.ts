import { Component, OnInit } from '@angular/core';
import { FacebookAuthService } from '../../auth-service/facebook.service';


@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {
  responseMessage: string = '';
  facebookData: any[] = []; // Aquí se almacenan los datos obtenidos de Facebook

  constructor(private facebookAuthService: FacebookAuthService) {}

  ngOnInit() {
    this.getFacebookPerfil(); // Llamar al método para obtener datos de Facebook al iniciar el componente
  }

  getFacebookPerfil() {
    this.facebookAuthService['getFacebookPerfil']().subscribe({
      next: (data: any[]) => {
        this.facebookData = data; // Guardar los datos obtenidos en la propiedad
      },
      error: (error: any) => {
        console.error('Error al obtener los datos de Facebook:', error);
        this.responseMessage = 'Error al obtener los datos de Facebook.';
      }
    });
  }
}
