import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { AgenciasComponent } from './pages/agencias/agencias.component';
import { ExperienciasComponent } from './pages/experiencias/experiencias.component';
import { HotelesComponent } from './pages/hoteles/hoteles.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { TransportistasComponent } from './pages/transportistas/transportistas.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Perfil } from './pages/perfil/perfil';
import { TweetComponent } from './pages/tweets/tweets.component';
import { TwitchComponent } from './pages/twitch/twitch.component';
import { PaypalComponent } from './pages/paypal/paypal.componet';
import { AuthGuard } from './auth-service/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'paquetes', component: PaquetesComponent },
      { path: 'agencias', component: AgenciasComponent },
      { path: 'experiencias', component: ExperienciasComponent },
      { path: 'hoteles', component: HotelesComponent },
      { path: 'restaurantes', component: RestaurantesComponent },
      { path: 'transportista', component: TransportistasComponent },
      { path: 'perfil', component: Perfil },
      { path: 'twitter', component: TweetComponent },
      { path: 'twitch', component: TwitchComponent },
      { path: 'twitch/callback', component: TwitchComponent },
      { path: 'paypal', component: PaypalComponent, canActivate: [AuthGuard] },
      { path: 'paypal/:paqueteId', component: PaypalComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'inicio' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViajeSumRoutingModule { }
