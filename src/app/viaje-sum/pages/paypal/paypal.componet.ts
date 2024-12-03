import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Paquete } from '../../../auth/pages.adm/Paquetes/Paquete.interface';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']

})
export class PaypalComponent implements OnInit {
  paqueteId: string | null = null;
  paquete: Paquete | undefined;
  amount: string = '10.00'; // Ajusta el monto según el paquete seleccionado

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // Obtener el paqueteId de los parámetros de la URL
    this.paqueteId = this.route.snapshot.paramMap.get('paqueteId');
    
    if (this.paqueteId) {
      // Cargar los detalles del paquete usando el paqueteId
      this.loadPaqueteDetails(this.paqueteId);
    }

    // Cargar el script de PayPal
    this.loadPayPalScript();
  }

  // Cargar los detalles del paquete
  private loadPaqueteDetails(paqueteId: string) {
    this.http.get<Paquete>(`http://localhost:3000/Paquetes/${paqueteId}`).subscribe(
      (data) => {
        console.log('Paquete details:', data);
        this.paquete = data;
  
        // Verifica que 'paquete' esté definido antes de acceder a 'costo'
        if (this.paquete && this.paquete.costo) {
          this.amount = this.paquete.costo.toString(); // Asumiendo que 'costo' es el campo que contiene el monto
        } else {
          console.error('El paquete no tiene un costo definido');
        }
      },
      (error) => {
        console.error('Error al cargar los detalles del paquete:', error);
      }
    );
  }
  

  // Cargar el script de PayPal
  loadPayPalScript() {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AUlbK4mKpNVWGd7hromw3H9c-DrroWugIAzT9mimgNOli39YPozvYX811v-w6SjvGQd97H8yVgbks23L`;
    script.onload = () => this.initPayPalButtons();
    document.body.appendChild(script);
  }

  // Inicializar los botones de PayPal
  initPayPalButtons() {
    (window as any).paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.amount // Usa el monto configurado
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Transaction completed by ' + details.payer.name.given_name);
          // Redirigir a la página de confirmación si es necesario
        });
      }
    }).render('#paypal-button-container');
  }
}
