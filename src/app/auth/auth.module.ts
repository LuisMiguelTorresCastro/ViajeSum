import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { RegAgenciaComponent } from './pages.adm/Agencia/regAgencia/regAgencia.component';
import { AdmComponent } from './pages.adm/adm/adm.component';
import { HttpClientModule } from '@angular/common/http';
import { RegAgenciaCardComponent } from './pages.adm/Agencia/regAge-card/regAgencia-card.component';
import { UpdAgenciaComponent } from './pages.adm/Agencia/updAgencia/updAgencia.component';
import { DelAgenciaComponent } from './pages.adm/Agencia/delAgencia/delAgencia.component';
import { RegRestauranteComponent } from './pages.adm/Restaurante/regRestaurante/regRestaurante.component';
import { UpdRestauranteComponent } from './pages.adm/Restaurante/updRestaurante/updRestaurante.component';
import { DelRestauranteComponent } from './pages.adm/Restaurante/delRestaurante/delRestaurante.component';
import { RegRestauranteCardComponent } from './pages.adm/Restaurante/regRes-card/regRes-card.component';
import { DelPaquetespersonalizadosComponent } from './pages.adm/PaquetesPersonalizados/delPaquetespersonalizados/delPaquetespersonalizados.component';
import { RegPaquetespersonalizadosComponent } from './pages.adm/PaquetesPersonalizados/regPaquetespersonalizados/regPaquetespersonalizados.component';
import { RegPaquetePersonalizadoCardComponent } from './pages.adm/PaquetesPersonalizados/regPaP-card/regPaP-card.component';
import { RegExperienciasComponent } from './pages.adm/Experiencias/regExperiencias/regExperiencias.component';
import { UpdPaquetespersonalizadosComponent } from './pages.adm/PaquetesPersonalizados/updPaquetespersonalizados/updPaquetespersonalizados.component';
import { DelExperienciasComponent } from './pages.adm/Experiencias/delExperiencias/delExperiencias.component';
import { RegExperienciasCardComponent } from './pages.adm/Experiencias/regExp-card/regExp-card.component';
import { RegPaqueteComponent } from './pages.adm/Paquetes/regPaquetes/regPaquete.component';
import { UpdPaqueteComponent } from './pages.adm/Paquetes/updPaquetes/updPaquete.component';
import { DelPaqueteComponent } from './pages.adm/Paquetes/delPaquetes/delPaquete.component';
import { RegPaqueteCardComponent } from './pages.adm/Paquetes/regPaq-card/regPaq-card.component';
import { ConfirmDialogAgeComponent } from './pages.adm/Agencia/regAge-confirm-dialog/confirm-dialog-Age.component';
import { ConfirmDialogExpComponent } from './pages.adm/Experiencias/regExp-confirm-dialog/confirm-dialog-Exp.component';
import { ConfirmDialogPapComponent } from './pages.adm/PaquetesPersonalizados/regPaP-confirm-dialog/confirm-dialog-Pap.component';
import { ConfirmDialogPaqComponent } from './pages.adm/Paquetes/regPaq-confirm-dialog/confirm-dialog-Paq.component';
import { ConfirmDialogResComponent } from './pages.adm/Restaurante/regRes-confirm-dialog/confirm-dialog-Res.component';
import { UpdExperienciasComponent } from './pages.adm/Experiencias/updExperiencias/updExperiencias.component';

@NgModule({
  declarations: [
    RegAgenciaComponent,
    RegAgenciaCardComponent,
    ConfirmDialogAgeComponent,
    AdmComponent,
    UpdAgenciaComponent,
    DelAgenciaComponent,
    RegRestauranteComponent,
    UpdRestauranteComponent,
    DelRestauranteComponent,
    RegRestauranteCardComponent,
    DelPaquetespersonalizadosComponent,
    RegPaquetespersonalizadosComponent,
    UpdPaquetespersonalizadosComponent,
    RegPaquetePersonalizadoCardComponent,
    RegExperienciasComponent,
    DelExperienciasComponent,
    RegExperienciasCardComponent,
    RegPaqueteComponent,
    UpdPaqueteComponent,
    DelPaqueteComponent,
    RegPaqueteCardComponent,
    ConfirmDialogExpComponent,
    ConfirmDialogPapComponent,
    ConfirmDialogPaqComponent,
    ConfirmDialogResComponent,
    UpdExperienciasComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule,
    
  ],
})
export class AuthModule { }
