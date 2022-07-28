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
import { AppComponent } from './app.component';
import { AutenticacaoService } from './shared/services/autenticacao.service';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AutenticacaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
