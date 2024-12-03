import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegAgenciaComponent } from './pages.adm/Agencia/regAgencia/regAgencia.component';
import { AdmComponent } from './pages.adm/adm/adm.component';
import { InicioComponent } from '../viaje-sum/pages/inicio/inicio.component';
import { DelAgenciaComponent } from './pages.adm/Agencia/delAgencia/delAgencia.component';
import { UpdAgenciaComponent } from './pages.adm/Agencia/updAgencia/updAgencia.component';
import { RegRestauranteComponent } from './pages.adm/Restaurante/regRestaurante/regRestaurante.component';
import { UpdRestauranteComponent } from './pages.adm/Restaurante/updRestaurante/updRestaurante.component';
import { DelRestauranteComponent } from './pages.adm/Restaurante/delRestaurante/delRestaurante.component';
import { DelPaquetespersonalizadosComponent } from './pages.adm/PaquetesPersonalizados/delPaquetespersonalizados/delPaquetespersonalizados.component';
import { RegPaquetespersonalizadosComponent } from './pages.adm/PaquetesPersonalizados/regPaquetespersonalizados/regPaquetespersonalizados.component';
import { UpdPaquetespersonalizadosComponent } from './pages.adm/PaquetesPersonalizados/updPaquetespersonalizados/updPaquetespersonalizados.component';
import { UpdExperienciasComponent } from './pages.adm/Experiencias/updExperiencias/updExperiencias.component';
import { DelExperienciasComponent } from './pages.adm/Experiencias/delExperiencias/delExperiencias.component';
import { RegPaqueteComponent } from './pages.adm/Paquetes/regPaquetes/regPaquete.component';
import { UpdPaqueteComponent } from './pages.adm/Paquetes/updPaquetes/updPaquete.component';
import { DelPaqueteComponent } from './pages.adm/Paquetes/delPaquetes/delPaquete.component';
import { RegExperienciasComponent } from './pages.adm/Experiencias/regExperiencias/regExperiencias.component';

const routes: Routes = [
  {
    path:'',
    component: AdmComponent,
    children: [
      { path: 'registro', component: RegAgenciaComponent },
      { path: 'edit', component: UpdAgenciaComponent },
      { path: 'eliminar', component: DelAgenciaComponent },

      { path: 'registror', component: RegRestauranteComponent },
      { path: 'editr', component: UpdRestauranteComponent },
      { path: 'eliminarr', component: DelRestauranteComponent },

      { path: 'registropp', component: RegPaquetespersonalizadosComponent },
      { path: 'editpp', component: UpdPaquetespersonalizadosComponent },
      { path: 'eliminarpp', component: DelPaquetespersonalizadosComponent },

      { path: 'registroe', component: RegExperienciasComponent },
      { path: 'edite', component: UpdExperienciasComponent },
      { path: 'eliminare', component: DelExperienciasComponent },

      { path: 'registrop', component: RegPaqueteComponent },
      { path: 'editp', component: UpdPaqueteComponent },
      { path: 'eliminarp', component: DelPaqueteComponent },

      { path: 'inicio', component: InicioComponent },
      { path: '**',redirectTo: 'adm'}
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
