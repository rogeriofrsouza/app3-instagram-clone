import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { LoginComponent } from './acesso/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { AutenticacaoGuardService } from './shared/services/autenticacao-guard.service';
import { AutenticacaoService } from './shared/services/autenticacao.service';
import { DbService } from './shared/services/db.service';
import { ProgressoService } from './shared/services/progresso.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    AutenticacaoService,
    AutenticacaoGuardService,
    DbService,
    ProgressoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
