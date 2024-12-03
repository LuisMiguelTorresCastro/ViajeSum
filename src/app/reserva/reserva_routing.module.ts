import { NgModule } from '@angular/core';
import { InicioComponent } from '../viaje-sum/pages/inicio/inicio.component';
import { DetallesComponent } from './pages/details/detalles';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'detalles', component: DetallesComponent }, // Ruta para el componente de inicio de sesión

  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir a 'login' por defecto
  { path: '**', redirectTo: 'login' } // Redirigir cualquier ruta desconocida a 'login'
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
