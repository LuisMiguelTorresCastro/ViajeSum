import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ViajeSumRoutingModule } from './viaje-sum-routing.module';
import { ViajeSumPageComponent } from './pages/viaje-sum-page/viaje-sum-page.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { AgenciasComponent } from './pages/agencias/agencias.component';
import { ExperienciasComponent } from './pages/experiencias/experiencias.component';
import { HotelesComponent } from './pages/hoteles/hoteles.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { RouterModule } from '@angular/router';
import { TransportistasComponent } from './pages/transportistas/transportistas.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Perfil } from './pages/perfil/perfil';
import { TweetComponent } from './pages/tweets/tweets.component';
import { TwitchComponent } from './pages/twitch/twitch.component';
import { PaypalComponent } from './pages/paypal/paypal.componet';


@NgModule({
  declarations: [
    ViajeSumPageComponent,
    InicioComponent,
    PaquetesComponent,
    AgenciasComponent,
    ExperienciasComponent,
    HotelesComponent,
    RestaurantesComponent,
    SidebarComponent,
    TransportistasComponent,
    Perfil,
    TweetComponent,
    TwitchComponent,
    PaypalComponent
  ],
  imports: [
    CommonModule,
    ViajeSumRoutingModule,
    MaterialModule,
  ],
  exports: [RouterModule]
})
export class ViajeSumModule { }

