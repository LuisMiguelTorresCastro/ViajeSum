import { NgModule } from '@angular/core';
import { Pago } from './pages/pago/pago';
import { DetallesComponent } from './pages/details/detalles';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReservaRoutingModule } from './reserva_routing.module';


@NgModule({
  declarations: [
    Pago,
    DetallesComponent
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule,
    ReservaRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class ReservaModule { }
