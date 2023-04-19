import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideComponent } from './aside/aside.component';
import { DocumentsComponent } from './documents/documents.component';
import { JsComponent } from './js/js.component';
import { ConfigDocComponent } from './config-doc/config-doc.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeAdminComponent,
    NavbarComponent,
    AsideComponent,
    DocumentsComponent,
    JsComponent,
    ConfigDocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
